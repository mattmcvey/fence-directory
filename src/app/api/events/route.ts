import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

const ALLOWED_EVENTS = ['profile_view', 'phone_click', 'website_click', 'quote_request'];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contractorId, eventType, referrer } = body;

    if (!contractorId || !eventType || !ALLOWED_EVENTS.includes(eventType)) {
      return NextResponse.json({ error: 'Invalid event' }, { status: 400 });
    }

    const supabase = getServiceClient();

    await supabase.from('events').insert({
      contractor_id: contractorId,
      event_type: eventType,
      referrer: referrer || null,
      user_agent: request.headers.get('user-agent') || null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // fail silently — tracking should never break UX
  }
}
