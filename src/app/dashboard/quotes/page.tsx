import { requireAuth } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quote Requests — FenceFind',
  robots: { index: false },
};

export default async function QuotesPage() {
  const user = await requireAuth();
  if (!user.contractorId) redirect('/dashboard');

  const supabase = getServiceClient();
  const { data: quotes } = await supabase
    .from('quote_requests')
    .select('*')
    .eq('contractor_id', user.contractorId)
    .order('created_at', { ascending: false });

  const rows = quotes || [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Quote Requests</h1>
      <p className="text-gray-600 mb-8">Leads from homeowners looking for fence work in your area</p>

      {rows.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No quote requests yet</h2>
          <p className="text-gray-500 text-sm">
            When homeowners request quotes through your listing, they&apos;ll appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Material</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">ZIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((q: any) => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(q.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{q.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <div>{q.email}</div>
                      {q.phone && <div className="text-gray-400">{q.phone}</div>}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{q.fence_type || '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{q.material || '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{q.zip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
