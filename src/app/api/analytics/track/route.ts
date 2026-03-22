import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const supabase = getServiceClient();


    const country = request.headers.get('x-vercel-ip-country') || null;
    const city = request.headers.get('x-vercel-ip-city') || null;
    const region = request.headers.get('x-vercel-ip-country-region') || null;


    const { count } = await supabase
      .from('pageviews')
      .select('*', { count: 'exact', head: true })
      .eq('session_id', data.session_id);

    const isUnique = (count || 0) === 0;

    await supabase.from('pageviews').insert({
      path: data.path,
      referrer: data.referrer,
      user_agent: request.headers.get('user-agent'),
      country,
      city,
      region,
      device_type: data.device_type,
      browser: data.browser,
      os: data.os,
      session_id: data.session_id,
      is_unique: isUnique,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
