import { NextResponse } from 'next/server';
import { notifyNewSignup } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email, fullName } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    // Fire and forget — don't block on email delivery
    notifyNewSignup({ email, fullName: fullName || '' });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // fail silently
  }
}
