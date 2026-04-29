import { requireAuth } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';
import { getContractorEventTrend } from '@/lib/data';
import Link from 'next/link';
import { FileText, MessageSquare, CreditCard, ExternalLink, Eye, Phone, Globe, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard — FenceFind',
  robots: { index: false },
};

function TrendBadge({ current, previous }: { current: number; previous: number }) {
  if (previous === 0 && current === 0) return null;
  if (previous === 0) return <span className="text-xs text-green-600 font-medium">New</span>;

  const pct = Math.round(((current - previous) / previous) * 100);
  if (pct === 0) return <span className="text-xs text-gray-400">No change</span>;

  return pct > 0 ? (
    <span className="inline-flex items-center gap-0.5 text-xs text-green-600 font-medium">
      <TrendingUp className="w-3 h-3" /> {pct}%
    </span>
  ) : (
    <span className="inline-flex items-center gap-0.5 text-xs text-red-500 font-medium">
      <TrendingDown className="w-3 h-3" /> {Math.abs(pct)}%
    </span>
  );
}

export default async function DashboardPage() {
  const user = await requireAuth();
  const supabase = getServiceClient();

  let contractor: any = null;
  let quoteCount = 0;
  let trend: { current: Record<string, number>; previous: Record<string, number> } = { current: {}, previous: {} };

  if (user.contractorId) {
    const [contractorRes, quoteRes, trendRes] = await Promise.all([
      supabase
        .from('contractors')
        .select('name, city, state, featured, subscription_status, slug')
        .eq('id', user.contractorId)
        .single(),
      supabase
        .from('quote_requests')
        .select('id', { count: 'exact', head: true })
        .eq('contractor_id', user.contractorId),
      getContractorEventTrend(user.contractorId),
    ]);

    contractor = contractorRes.data;
    quoteCount = quoteRes.count || 0;
    trend = trendRes;
  }

  const isPro = contractor?.subscription_status === 'active' || contractor?.subscription_status === 'trialing';
  const profileViews = trend.current.profile_view || 0;
  const phoneClicks = trend.current.phone_click || 0;
  const websiteClicks = trend.current.website_click || 0;
  const quoteRequests = trend.current.quote_request || 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Welcome back{user.fullName ? `, ${user.fullName}` : ''}
      </h1>
      <p className="text-gray-600 mb-8">Manage your FenceFind listing and leads</p>

      {contractor ? (
        <>
          {/* Engagement stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-blue-50 p-1.5 rounded-lg">
                  <Eye className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">Profile Views</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{profileViews}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400">Last 30 days</span>
                <TrendBadge current={profileViews} previous={trend.previous.profile_view || 0} />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-green-50 p-1.5 rounded-lg">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-500">Phone Clicks</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{phoneClicks}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400">Last 30 days</span>
                <TrendBadge current={phoneClicks} previous={trend.previous.phone_click || 0} />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-purple-50 p-1.5 rounded-lg">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">Quote Requests</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{quoteRequests}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400">Last 30 days</span>
                <TrendBadge current={quoteRequests} previous={trend.previous.quote_request || 0} />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-amber-50 p-1.5 rounded-lg">
                  <Globe className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-sm text-gray-500">Website Clicks</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{websiteClicks}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400">Last 30 days</span>
                <TrendBadge current={websiteClicks} previous={trend.previous.website_click || 0} />
              </div>
              {!isPro && websiteClicks > 0 && (
                <p className="text-xs text-amber-600 mt-2">
                  Upgrade to Pro to show your website in search results
                </p>
              )}
            </div>
          </div>

          {/* Upgrade prompt for free contractors with engagement */}
          {!isPro && profileViews >= 10 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 mb-1">
                    {profileViews} homeowners viewed your profile this month
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Upgrade to Pro to get featured placement, your website link shown in search results,
                    and a verified Pro badge that builds trust with potential customers.
                  </p>
                  <Link
                    href="/pro/signup"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    Start Pro — 14-day Free Trial
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Listing + plan info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-50 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm text-gray-500">Listing</span>
              </div>
              <p className="font-semibold text-gray-900">{contractor.name}</p>
              <p className="text-sm text-gray-500">{contractor.city}, {contractor.state}</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-50 p-2 rounded-lg">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">Plan</span>
              </div>
              <p className="font-semibold text-gray-900">{isPro ? 'Pro' : 'Free'}</p>
              {contractor.featured && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Featured</span>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Edit Profile</span>
              </Link>
              <Link
                href="/dashboard/quotes"
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">View Quotes ({quoteCount})</span>
              </Link>
              <Link
                href="/dashboard/subscription"
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Manage Subscription</span>
              </Link>
              <a
                href={`/contractor/${contractor.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">View Public Listing</span>
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No listing linked yet</h2>
            <p className="text-gray-600 mb-6">
              Claim an existing listing or add your business to start managing it from your dashboard.
            </p>
            <Link
              href="/claim"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Claim or Add Your Business
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Account</h2>
            <Link
              href="/dashboard/subscription"
              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <CreditCard className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Manage Subscription</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
