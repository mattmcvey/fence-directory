import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contractorId, claimId, contractorName, email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Missing email' },
        { status: 400 }
      );
    }
    // not used seems to be a leftover
    const refId = contractorId || claimId || 'new';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID_PRO!,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          contractorId: contractorId || '',
          claimId: claimId || '',
          contractorName: contractorName || '',
          app: 'fencefind',
        },
      },
      metadata: {
        contractorId: contractorId || '',
        claimId: claimId || '',
        contractorName: contractorName || '',
        app: 'fencefind',
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://getfencefind.com'}/pro/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://getfencefind.com'}/pricing`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
