import { requireAuth } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';
import { stripe } from '@/lib/stripe';
import SubscriptionCard from './SubscriptionCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscription — FenceFind',
  robots: { index: false },
};

export default async function SubscriptionPage() {
  const user = await requireAuth();
  const supabase = getServiceClient();

  let contractor: {
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    subscription_status: string | null;
    pro_since: string | null;
    featured: boolean;
  } | null = null;

  if (user.contractorId) {
    const { data } = await supabase
      .from('contractors')
      .select('stripe_customer_id, stripe_subscription_id, subscription_status, pro_since, featured')
      .eq('id', user.contractorId)
      .single();
    contractor = data;
  }

  // Fallback: if no contractor linked, look up Stripe customer by email
  if (!contractor?.stripe_customer_id && user.email) {
    try {
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length > 0) {
        const customer = customers.data[0];
        const subscriptions = await stripe.subscriptions.list({
          customer: customer.id,
          limit: 1,
        });
        const sub = subscriptions.data[0];
        contractor = {
          stripe_customer_id: customer.id,
          stripe_subscription_id: sub?.id || null,
          subscription_status: sub?.status || 'free',
          pro_since: sub ? new Date(sub.created * 1000).toISOString() : null,
          featured: sub?.status === 'active' || sub?.status === 'trialing',
        };
      }
    } catch (err) {
      console.error('Stripe customer lookup failed:', err);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Subscription</h1>
      <p className="text-gray-600 mb-8">Manage your FenceFind plan and billing</p>
      <SubscriptionCard contractor={contractor} />
    </div>
  );
}
