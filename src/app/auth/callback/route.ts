import { NextRequest, NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const type = searchParams.get('type');

  if (code) {
    const supabase = await createAuthServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (type === 'recovery') {
    return NextResponse.redirect(new URL('/auth/update-password', request.url));
  }

  return NextResponse.redirect(new URL('/dashboard', request.url));
}
