'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  contractor: {
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    subscription_status: string | null;
    pro_since: string | null;
    featured: boolean;
    cancel_at: string | null;
  } | null;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-green-100 text-green-700' },
  trialing: { label: 'Trial', color: 'bg-blue-100 text-blue-700' },
  past_due: { label: 'Past Due', color: 'bg-red-100 text-red-700' },
  canceled: { label: 'Canceled', color: 'bg-gray-100 text-gray-600' },
  free: { label: 'Free', color: 'bg-gray-100 text-gray-600' },
};

export default function SubscriptionCard({ contractor }: Props) {
  const [loading, setLoading] = useState(false);

  const status = contractor?.subscription_status || 'free';
  const isPro = status === 'active' || status === 'trialing';
  const statusInfo = STATUS_LABELS[status] || STATUS_LABELS.free;

  const handleManageBilling = async () => {
    if (!contractor?.stripe_customer_id) return;
    setLoading(true);

    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: contractor.stripe_customer_id }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isPro ? 'bg-green-50' : 'bg-gray-50'}`}>
              <CreditCard className={`w-5 h-5 ${isPro ? 'text-green-600' : 'text-gray-400'}`} />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{isPro ? 'Pro Plan' : 'Free Plan'}</h2>
              {isPro && <p className="text-sm text-gray-500">$79/month</p>}
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        </div>

        {isPro ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Featured placement on city pages
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Unlimited lead notifications
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Verified Pro badge
            </div>
            {contractor?.pro_since && (
              <p className="text-xs text-gray-400 pt-2">
                Pro since {new Date(contractor.pro_since).toLocaleDateString()}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <AlertCircle className="w-4 h-4 text-gray-400" />
              Basic listing only
            </div>
            <p className="text-sm text-gray-600">
              Upgrade to Pro for featured placement, unlimited leads, and a verified badge.
            </p>
          </div>
        )}
      </div>

      {isPro && contractor?.stripe_customer_id ? (
        <button
          onClick={handleManageBilling}
          disabled={loading}
          className="w-full bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 text-gray-700 py-2.5 rounded-lg font-medium transition-colors"
        >
          {loading ? 'Loading...' : 'Manage Billing'}
        </button>
      ) : (
        !isPro && (
          <Link
            href="/pro/signup"
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition-colors"
          >
            Upgrade to Pro — 14-day free trial
          </Link>
        )
      )}

      {contractor?.cancel_at && isPro && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-700">
          Your subscription is set to cancel on {new Date(contractor.cancel_at).toLocaleDateString()}. You&apos;ll keep Pro features until then.
        </div>
      )}

      {status === 'past_due' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          Your payment failed. Please update your billing information to keep your Pro features active.
        </div>
      )}
    </div>
  );
}
