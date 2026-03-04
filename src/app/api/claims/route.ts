import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { notifyClaimSubmission } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { businessName, contactName, email, phone, city, state, website, message, contractorId } = body;

    // Validate required fields
    if (!businessName || !contactName || !email || !phone || !city || !state) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = getServiceClient();

    const { data: insertData, error } = await supabase.from('claim_requests').insert({
      business_name: businessName.trim(),
      contact_name: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      state: state.trim(),
      website: website?.trim() || null,
      message: message?.trim() || null,
      contractor_id: contractorId || null,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to submit claim request' },
        { status: 500 }
      );
    }

    // Send email notification (non-blocking — don't fail the request if email fails)
    await notifyClaimSubmission({
      businessName: businessName.trim(),
      contactName: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      state: state.trim(),
      website: website?.trim() || undefined,
      message: message?.trim() || undefined,
    });

    return NextResponse.json({ success: true, contractorId: contractorId || null });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
