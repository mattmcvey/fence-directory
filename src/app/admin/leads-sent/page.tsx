import { requireAdmin } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';
import LeadsSentList from './LeadsSentList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leads Sent — FenceFind Admin',
  robots: { index: false },
};

export default async function LeadsSentPage() {
  await requireAdmin();

  const supabase = getServiceClient();

  // Get recent leads sent
  const { data: leadsSent } = await supabase
    .from('leads_sent')
    .select('*, contractor:contractors(name, slug, city, state)')
    .order('sent_at', { ascending: false })
    .limit(100);

  // Get lead counts by contractor
  const { data: leadCounts } = await supabase
    .from('contractor_lead_counts')
    .select('*')
    .order('total_leads_sent', { ascending: false })
    .limit(50);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Leads Sent</h1>
      <p className="text-gray-600 mb-8">Track leads sent to contractors</p>
      <LeadsSentList leadsSent={leadsSent || []} leadCounts={leadCounts || []} />
    </div>
  );
}
