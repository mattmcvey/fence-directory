import { requireAuth } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';
import Link from 'next/link';
import { FileText, MessageSquare, CreditCard, ExternalLink } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard — FenceFind',
  robots: { index: false },
};

export default async function DashboardPage() {
  const user = await requireAuth();
  const supabase = getServiceClient();

  let contractor: any = null;
  let quoteCount = 0;

  if (user.contractorId) {
    const { data } = await supabase
      .from('contractors')
      .select('name, city, state, featured, subscription_status, slug')
      .eq('id', user.contractorId)
      .single();
    contractor = data;

    const { count } = await supabase
      .from('quote_requests')
      .select('id', { count: 'exact', head: true })
      .eq('contractor_id', user.contractorId);
    quoteCount = count || 0;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Welcome back{user.fullName ? `, ${user.fullName}` : ''}
      </h1>
      <p className="text-gray-600 mb-8">Manage your FenceFind listing and leads</p>

      {contractor ? (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
                <div className="bg-blue-50 p-2 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">Quote Requests</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{quoteCount}</p>
              <Link href="/dashboard/quotes" className="text-sm text-green-600 hover:text-green-700">
                View all
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-50 p-2 rounded-lg">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">Plan</span>
              </div>
              <p className="font-semibold text-gray-900">
                {contractor.subscription_status === 'active' || contractor.subscription_status === 'trialing'
                  ? 'Pro'
                  : 'Free'}
              </p>
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
                <span className="text-sm font-medium text-gray-700">View Quotes</span>
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
      )}
    </div>
  );
}
