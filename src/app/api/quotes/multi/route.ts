import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { notifyQuoteRequest } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { citySlug, name, email, phone, fenceType, message } = body;

    if (!citySlug || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = getServiceClient();

    // Parse city slug: "los-angeles-ca" → city "Los Angeles", state "CA"
    const parts = citySlug.split('-');
    const stateCode = parts.pop()!.toUpperCase();
    const cityName = parts.map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');

    // Find top 3 contractors in this city
    const { data: contractors } = await supabase
      .from('contractors')
      .select('id, name')
      .ilike('city', cityName)
      .eq('state', stateCode)
      .order('featured', { ascending: false })
      .order('rating', { ascending: false })
      .limit(3);

    if (!contractors || contractors.length === 0) {
      return NextResponse.json({ error: 'No contractors found in this area' }, { status: 404 });
    }

    // Create a quote request for each contractor
    const quoteRows = contractors.map((c: { id: string; name: string }) => ({
      contractor_id: c.id,
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      zip: null,
      fence_type: fenceType?.trim() || null,
      material: null,
      approximate_length: null,
      message: message?.trim() || null,
    }));

    const { error } = await supabase.from('quote_requests').insert(quoteRows);

    if (error) {
      console.error('Multi-quote insert error:', error);
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
    }

    // Track events
    const eventRows = contractors.map((c: { id: string; name: string }) => ({
      contractor_id: c.id,
      event_type: 'quote_request',
    }));
    await supabase.from('events').insert(eventRows);

    // Notify for each contractor (fire and forget)
    for (const c of contractors) {
      notifyQuoteRequest({
        contractorName: c.name,
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || undefined,
        zip: 'N/A',
        fenceType: fenceType?.trim() || undefined,
        message: message?.trim() || undefined,
      });
    }

    return NextResponse.json({ success: true, count: contractors.length });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
