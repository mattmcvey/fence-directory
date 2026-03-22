'use client';

import { useState, useEffect, useCallback } from 'react';
import { BarChart3, Users, Eye, Globe, Monitor, Smartphone, ArrowUpRight, RefreshCw, Lock } from 'lucide-react';

interface AnalyticsData {
  period: { days: number; since: string };
  summary: { totalPageviews: number; uniqueVisitors: number };
  topPages: { path: string; views: number; unique: number }[];
  topReferrers: { referrer: string; count: number }[];
  devices: Record<string, number>;
  browsers: Record<string, number>;
  topCountries: { country: string; count: number }[];
  dailyTrend: { date: string; views: number; visitors: number }[];
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);
  const [adminKey, setAdminKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics/data?days=${days}`, {
        headers: { 'x-admin-key': adminKey },
      });
      if (!res.ok) {
        if (res.status === 401) {
          setAuthenticated(false);
          setError('Invalid admin key');
          return;
        }
        throw new Error('Failed to fetch');
      }
      const json = await res.json();
      setData(json);
      setAuthenticated(true);
    } catch {
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  }, [days, adminKey]);

  useEffect(() => {

    const saved = localStorage.getItem('ff_admin_key');
    if (saved) {
      setAdminKey(saved);
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (adminKey && authenticated) {
      localStorage.setItem('ff_admin_key', adminKey);
      fetchData();
    }
  }, [days, authenticated, fetchData, adminKey]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border p-8 max-w-sm w-full">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-gray-400" />
            <h1 className="text-xl font-bold text-gray-900">Analytics Dashboard</h1>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setAuthenticated(true); }}>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Admin key"
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Access Dashboard
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>
      </div>
    );
  }


  const maxViews = data ? Math.max(...data.dailyTrend.map(d => d.views), 1) : 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">FenceFind Analytics</h1>
            <p className="text-gray-500 text-sm mt-1">Self-tracked pageview data</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="px-3 py-2 border rounded-lg text-sm bg-white"
            >
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 bg-white border rounded-lg hover:bg-gray-50 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {data && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <SummaryCard
                icon={<Eye className="w-5 h-5 text-blue-600" />}
                label="Page Views"
                value={data.summary.totalPageviews}
                bg="bg-blue-50"
              />
              <SummaryCard
                icon={<Users className="w-5 h-5 text-green-600" />}
                label="Unique Visitors"
                value={data.summary.uniqueVisitors}
                bg="bg-green-50"
              />
              <SummaryCard
                icon={<BarChart3 className="w-5 h-5 text-purple-600" />}
                label="Pages / Visitor"
                value={data.summary.uniqueVisitors > 0
                  ? (data.summary.totalPageviews / data.summary.uniqueVisitors).toFixed(1)
                  : '0'}
                bg="bg-purple-50"
              />
              <SummaryCard
                icon={<Globe className="w-5 h-5 text-orange-600" />}
                label="Countries"
                value={data.topCountries.length}
                bg="bg-orange-50"
              />
            </div>

            {/* Daily Trend Chart */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
              <h2 className="font-semibold text-gray-900 mb-4">Daily Traffic</h2>
              {data.dailyTrend.length === 0 ? (
                <p className="text-gray-400 text-sm py-8 text-center">No data yet — pageviews will appear here once tracking is live.</p>
              ) : (
                <div className="flex items-end gap-1 h-48">
                  {data.dailyTrend.map((day) => (
                    <div key={day.date} className="flex-1 flex flex-col items-center group relative">
                      <div className="absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                        {day.date}: {day.views} views, {day.visitors} visitors
                      </div>
                      <div
                        className="w-full bg-green-500 rounded-t hover:bg-green-600 transition min-h-[2px]"
                        style={{ height: `${(day.views / maxViews) * 100}%` }}
                      />
                      <span className="text-[10px] text-gray-400 mt-1 rotate-[-45deg] origin-top-left">
                        {day.date.slice(5)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Two column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Top Pages */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Top Pages</h2>
                <div className="space-y-3">
                  {data.topPages.length === 0 && (
                    <p className="text-gray-400 text-sm">No pages tracked yet</p>
                  )}
                  {data.topPages.map((page) => (
                    <div key={page.path} className="flex items-center justify-between">
                      <a
                        href={`https://getfencefind.com${page.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-700 hover:text-green-600 transition truncate max-w-[60%] flex items-center gap-1"
                      >
                        {page.path}
                        <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
                      </a>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">{page.views} views</span>
                        <span className="text-gray-400">{page.unique} unique</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Referrers */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Top Referrers</h2>
                <div className="space-y-3">
                  {data.topReferrers.length === 0 && (
                    <p className="text-gray-400 text-sm">No referrer data yet</p>
                  )}
                  {data.topReferrers.map((ref) => (
                    <div key={ref.referrer} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 truncate max-w-[70%]">
                        {ref.referrer}
                      </span>
                      <span className="text-sm text-gray-500">{ref.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Three column: devices, browsers, countries */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Devices */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Monitor className="w-4 h-4 text-gray-400" />
                  <h2 className="font-semibold text-gray-900">Devices</h2>
                </div>
                <div className="space-y-2">
                  {Object.entries(data.devices).map(([device, count]) => (
                    <div key={device} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 flex items-center gap-2">
                        {device === 'mobile' ? <Smartphone className="w-3 h-3" /> : null}
                        {device}
                      </span>
                      <span className="text-sm text-gray-500">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Browsers */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Browsers</h2>
                <div className="space-y-2">
                  {Object.entries(data.browsers).map(([browser, count]) => (
                    <div key={browser} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{browser}</span>
                      <span className="text-sm text-gray-500">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Countries */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <h2 className="font-semibold text-gray-900">Countries</h2>
                </div>
                <div className="space-y-2">
                  {data.topCountries.map(({ country, count }) => (
                    <div key={country} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{country}</span>
                      <span className="text-sm text-gray-500">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vercel comparison note */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-2">📊 Comparing with Vercel Analytics</h3>
              <p className="text-blue-800 text-sm">
                This dashboard shows our self-tracked data. Compare these numbers with your{' '}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600"
                >
                  Vercel Analytics dashboard
                </a>{' '}
                to cross-reference. Differences are normal — Vercel uses server-side tracking while
                ours is client-side. If Vercel shows higher numbers, it likely includes bots and
                prefetch requests that our client-side tracker filters out.
              </p>
            </div>
          </>
        )}

        {!data && !loading && !error && (
          <div className="text-center py-20 text-gray-400">
            Enter your admin key to view analytics
          </div>
        )}

        {loading && !data && (
          <div className="text-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-green-500 mx-auto" />
            <p className="text-gray-400 mt-4">Loading analytics...</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value, bg }: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  bg: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${bg}`}>{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
