import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { businessName, contactName, email, phone, city, state, website, message } = body;

    // Validate required fields
    if (!businessName || !contactName || !email || !phone || !city || !state) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = getServiceClient();

    const { error } = await supabase.from('claim_requests').insert({
      business_name: businessName.trim(),
      contact_name: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      state: state.trim(),
      website: website?.trim() || null,
      message: message?.trim() || null,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to submit claim request' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
