import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { notifyQuoteRequest, confirmQuoteToHomeowner } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { contractorId, contractorName, name, email, phone, zip, fenceType, material, approximateLength, message } = body;


    if (!contractorId || !name || !email || !zip) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = getServiceClient();

    const { error } = await supabase.from('quote_requests').insert({
      contractor_id: contractorId,
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      zip: zip.trim(),
      fence_type: fenceType?.trim() || null,
      material: material?.trim() || null,
      approximate_length: approximateLength?.trim() || null,
      message: message?.trim() || null,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to submit quote request' },
        { status: 500 }
      );
    }

    // Track as engagement event
    await supabase.from('events').insert({
      contractor_id: contractorId,
      event_type: 'quote_request',
    }).then(() => {});

    await Promise.all([
      notifyQuoteRequest({
        contractorName: contractorName || 'Unknown',
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || undefined,
        zip: zip.trim(),
        fenceType: fenceType?.trim() || undefined,
        material: material?.trim() || undefined,
        approximateLength: approximateLength?.trim() || undefined,
        message: message?.trim() || undefined,
      }),
      confirmQuoteToHomeowner({
        homeownerName: name.trim(),
        homeownerEmail: email.trim(),
        contractorName: contractorName || 'the contractor',
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
