'use client';

import { useState } from 'react';
import { Mail, TrendingUp, Calendar } from 'lucide-react';

interface LeadSent {
  id: string;
  contractor_id: string;
  contractor_name: string;
  homeowner_name: string;
  homeowner_email: string;
  homeowner_phone: string | null;
  zip_code: string;
  fence_type: string | null;
  material: string | null;
  approximate_length: string | null;
  message: string | null;
  sent_at: string;
  contractor?: {
    name: string;
    slug: string;
    city: string;
    state: string;
  };
}

interface LeadCount {
  id: string;
  name: string;
  city: string;
  state: string;
  total_leads_sent: number;
  last_lead_sent: string | null;
}

export default function LeadsSentList({
  leadsSent,
  leadCounts,
}: {
  leadsSent: LeadSent[];
  leadCounts: LeadCount[];
}) {
  const [activeTab, setActiveTab] = useState<'recent' | 'stats'>('recent');

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab('recent')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'recent'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Recent Leads
          <span className="ml-1.5 text-xs text-gray-400">({leadsSent.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'stats'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          By Contractor
          <span className="ml-1.5 text-xs text-gray-400">({leadCounts.length})</span>
        </button>
      </div>

      {/* Recent Leads Tab */}
      {activeTab === 'recent' && (
        <div className="space-y-3">
          {leadsSent.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No leads sent yet</p>
            </div>
          ) : (
            leadsSent.map((lead) => (
              <div key={lead.id} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{lead.homeowner_name}</h3>
                      <span className="text-xs text-gray-400">→</span>
                      <span className="text-sm text-gray-600">
                        {lead.contractor?.name || lead.contractor_name}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        {lead.homeowner_email}
                        {lead.homeowner_phone && <> &middot; {lead.homeowner_phone}</>}
                        &middot; ZIP {lead.zip_code}
                      </p>
                      {(lead.fence_type || lead.material || lead.approximate_length) && (
                        <p className="text-gray-500">
                          {lead.fence_type && <>{lead.fence_type}</>}
                          {lead.material && <> &middot; {lead.material}</>}
                          {lead.approximate_length && <> &middot; {lead.approximate_length}</>}
                        </p>
                      )}
                      {lead.message && (
                        <p className="text-gray-500 italic text-xs mt-2">
                          &ldquo;{lead.message}&rdquo;
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Sent {new Date(lead.sent_at).toLocaleDateString()} at{' '}
                      {new Date(lead.sent_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="space-y-3">
          {leadCounts.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No lead statistics yet</p>
            </div>
          ) : (
            leadCounts.map((contractor) => (
              <div key={contractor.id} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{contractor.name}</h3>
                    <p className="text-sm text-gray-500">
                      {contractor.city}, {contractor.state}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {contractor.total_leads_sent}
                    </div>
                    <p className="text-xs text-gray-400">
                      {contractor.total_leads_sent === 1 ? 'lead' : 'leads'} sent
                    </p>
                    {contractor.last_lead_sent && (
                      <p className="text-xs text-gray-400 mt-1">
                        Last: {new Date(contractor.last_lead_sent).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
