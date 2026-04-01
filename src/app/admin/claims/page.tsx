import { requireAdmin } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';
import ClaimsList from './ClaimsList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Claims — FenceFind Admin',
  robots: { index: false },
};

export default async function ClaimsPage() {
  await requireAdmin();

  const supabase = getServiceClient();
  const { data: claims } = await supabase
    .from('claim_requests')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Claims</h1>
      <p className="text-gray-600 mb-8">Review and manage business claim requests</p>
      <ClaimsList claims={claims || []} />
    </div>
  );
}
