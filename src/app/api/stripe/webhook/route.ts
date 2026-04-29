import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServiceClient } from '@/lib/supabase';
import { notifyProCheckout } from '@/lib/email';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = getServiceClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const contractorId = session.metadata?.contractorId;

        if (contractorId) {

          await supabase
            .from('contractors')
            .update({
              featured: true,
              claimed: true,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              pro_since: new Date().toISOString(),
            })
            .eq('id', contractorId);

          // Notify admin of new Pro subscriber
          const { data: contractor } = await supabase
            .from('contractors')
            .select('name, email')
            .eq('id', contractorId)
            .single();

          await notifyProCheckout({
            contractorId,
            contractorName: contractor?.name || 'Unknown',
            email: contractor?.email || session.customer_email || '',
            stripeCustomerId: session.customer as string,
          });

          console.log(`✅ Contractor ${contractorId} upgraded to Pro`);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const contractorId = subscription.metadata?.contractorId;

        if (contractorId) {
          const isActive = ['active', 'trialing'].includes(subscription.status);

          await supabase
            .from('contractors')
            .update({
              featured: isActive,
              subscription_status: subscription.status,
            })
            .eq('id', contractorId);

          console.log(`Subscription ${subscription.id} status: ${subscription.status}`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const contractorId = subscription.metadata?.contractorId;

        if (contractorId) {

          await supabase
            .from('contractors')
            .update({
              featured: false,
              subscription_status: 'canceled',
              stripe_subscription_id: null,
            })
            .eq('id', contractorId);

          console.log(`❌ Contractor ${contractorId} downgraded — subscription canceled`);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Record<string, any>;
        const subId = typeof invoice.subscription === 'string'
          ? invoice.subscription
          : invoice.subscription?.id;

        if (subId) {
          const subscription = await stripe.subscriptions.retrieve(subId);
          const contractorId = subscription.metadata?.contractorId;

          if (contractorId) {
            await supabase
              .from('contractors')
              .update({ subscription_status: 'past_due' })
              .eq('id', contractorId);

            console.log(`⚠️ Payment failed for contractor ${contractorId}`);
          }
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
