import { NextRequest, NextResponse } from 'next/server';
import { createAuthServerClient, getServiceClient } from '@/lib/supabase';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const serviceClient = getServiceClient();

  await serviceClient
    .from('claim_requests')
    .update({ status: 'rejected' })
    .eq('id', id);

  return NextResponse.json({ success: true });
}
