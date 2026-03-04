import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  // Simple auth check — require admin key
  const authKey = request.headers.get('x-admin-key');
  const expectedKey = process.env.ANALYTICS_ADMIN_KEY;

  if (!expectedKey || authKey !== expectedKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getServiceClient();
  const { searchParams } = new URL(request.url);

  const days = parseInt(searchParams.get('days') || '30');
  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceISO = since.toISOString();

  // Fetch all pageviews in range
  const { data: pageviews, error } = await supabase
    .from('pageviews')
    .select('*')
    .gte('created_at', sinceISO)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = pageviews || [];

  // Aggregate stats
  const totalPageviews = rows.length;
  const uniqueVisitors = new Set(rows.filter(r => r.is_unique).map(r => r.session_id)).size;

  // Top pages
  const pageCounts: Record<string, { views: number; unique: number }> = {};
  for (const r of rows) {
    if (!pageCounts[r.path]) pageCounts[r.path] = { views: 0, unique: 0 };
    pageCounts[r.path].views++;
    if (r.is_unique) pageCounts[r.path].unique++;
  }
  const topPages = Object.entries(pageCounts)
    .map(([path, stats]) => ({ path, ...stats }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 20);

  // Top referrers
  const refCounts: Record<string, number> = {};
  for (const r of rows) {
    const ref = r.referrer || '(direct)';
    // Normalize referrer to domain
    let domain = ref;
    try {
      if (ref !== '(direct)') domain = new URL(ref).hostname;
    } catch { /* keep raw */ }
    refCounts[domain] = (refCounts[domain] || 0) + 1;
  }
  const topReferrers = Object.entries(refCounts)
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Devices
  const deviceCounts: Record<string, number> = {};
  for (const r of rows) {
    const d = r.device_type || 'unknown';
    deviceCounts[d] = (deviceCounts[d] || 0) + 1;
  }

  // Browsers
  const browserCounts: Record<string, number> = {};
  for (const r of rows) {
    const b = r.browser || 'unknown';
    browserCounts[b] = (browserCounts[b] || 0) + 1;
  }

  // Countries
  const countryCounts: Record<string, number> = {};
  for (const r of rows) {
    const c = r.country || 'unknown';
    countryCounts[c] = (countryCounts[c] || 0) + 1;
  }
  const topCountries = Object.entries(countryCounts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Daily trend
  const dailyCounts: Record<string, { views: number; visitors: number }> = {};
  for (const r of rows) {
    const day = r.created_at.split('T')[0];
    if (!dailyCounts[day]) dailyCounts[day] = { views: 0, visitors: 0 };
    dailyCounts[day].views++;
    if (r.is_unique) dailyCounts[day].visitors++;
  }
  const dailyTrend = Object.entries(dailyCounts)
    .map(([date, stats]) => ({ date, ...stats }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return NextResponse.json({
    period: { days, since: sinceISO },
    summary: { totalPageviews, uniqueVisitors },
    topPages,
    topReferrers,
    devices: deviceCounts,
    browsers: browserCounts,
    topCountries,
    dailyTrend,
  });
}
