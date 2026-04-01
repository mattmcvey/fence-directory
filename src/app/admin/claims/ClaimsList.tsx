'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface Claim {
  id: string;
  contractor_id: string | null;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  website: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const TABS = ['pending', 'approved', 'rejected'] as const;

export default function ClaimsList({ claims }: { claims: Claim[] }) {
  const [activeTab, setActiveTab] = useState<string>('pending');
  const [processing, setProcessing] = useState<string | null>(null);
  const router = useRouter();

  const filtered = claims.filter((c) => c.status === activeTab);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setProcessing(id);
    try {
      const res = await fetch(`/api/admin/claims/${id}/${action}`, { method: 'POST' });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setProcessing(null);
    }
  };

  const tabCounts = {
    pending: claims.filter((c) => c.status === 'pending').length,
    approved: claims.filter((c) => c.status === 'approved').length,
    rejected: claims.filter((c) => c.status === 'rejected').length,
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tabCounts[tab] > 0 && (
              <span className="ml-1.5 text-xs text-gray-400">({tabCounts[tab]})</span>
            )}
          </button>
        ))}
      </div>

      {/* Claims list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No {activeTab} claims</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((claim) => (
            <div key={claim.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{claim.business_name}</h3>
                    {claim.contractor_id ? (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Existing listing</span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">New business</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{claim.contact_name} &middot; {claim.email} &middot; {claim.phone}</p>
                  <p className="text-sm text-gray-500">{claim.city}, {claim.state}</p>
                  {claim.website && (
                    <p className="text-sm text-gray-400 truncate">{claim.website}</p>
                  )}
                  {claim.message && (
                    <p className="text-sm text-gray-500 mt-2 italic">&ldquo;{claim.message}&rdquo;</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(claim.created_at).toLocaleDateString()} at {new Date(claim.created_at).toLocaleTimeString()}
                  </p>
                </div>

                {claim.status === 'pending' && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleAction(claim.id, 'approve')}
                      disabled={processing === claim.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(claim.id, 'reject')}
                      disabled={processing === claim.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}

                {claim.status === 'approved' && (
                  <span className="flex items-center gap-1.5 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Approved
                  </span>
                )}

                {claim.status === 'rejected' && (
                  <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                    <XCircle className="w-4 h-4" />
                    Rejected
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
