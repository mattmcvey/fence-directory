import { requireAdmin } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';
import ContractorsList from './ContractorsList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Contractors — FenceFind Admin',
  robots: { index: false },
};

export default async function ContractorsPage() {
  await requireAdmin();

  const supabase = getServiceClient();
  const { data: contractors } = await supabase
    .from('contractors')
    .select('id, name, slug, city, state, phone, email, featured, verified, claimed, subscription_status, created_at')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Contractors</h1>
      <p className="text-gray-600 mb-8">Manage contractor listings</p>
      <ContractorsList contractors={contractors || []} />
    </div>
  );
}
