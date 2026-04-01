import { requireAuth } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import SubscriptionCard from './SubscriptionCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscription — FenceFind',
  robots: { index: false },
};

export default async function SubscriptionPage() {
  const user = await requireAuth();
  if (!user.contractorId) redirect('/dashboard');

  const supabase = getServiceClient();
  const { data: contractor } = await supabase
    .from('contractors')
    .select('stripe_customer_id, stripe_subscription_id, subscription_status, pro_since, featured')
    .eq('id', user.contractorId)
    .single();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Subscription</h1>
      <p className="text-gray-600 mb-8">Manage your FenceFind plan and billing</p>
      <SubscriptionCard contractor={contractor} />
    </div>
  );
}
