import { requireAuth } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import ProfileEditForm from './ProfileEditForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Profile — FenceFind',
  robots: { index: false },
};

export default async function ProfilePage() {
  const user = await requireAuth();
  if (!user.contractorId) redirect('/dashboard');

  const supabase = getServiceClient();
  const { data: contractor } = await supabase
    .from('contractors')
    .select('id, name, phone, email, website, description, services, materials, service_radius')
    .eq('id', user.contractorId)
    .single();

  if (!contractor) redirect('/dashboard');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Edit Profile</h1>
      <p className="text-gray-600 mb-8">Update your business information visible to homeowners</p>
      <ProfileEditForm contractor={contractor} />
    </div>
  );
}
