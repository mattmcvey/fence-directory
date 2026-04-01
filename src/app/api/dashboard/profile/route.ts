import { NextRequest, NextResponse } from 'next/server';
import { createAuthServerClient, getServiceClient } from '@/lib/supabase';

export async function PUT(request: NextRequest) {
  const supabase = await createAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('contractor_id')
    .eq('id', user.id)
    .single();

  if (!profile?.contractor_id) {
    return NextResponse.json({ error: 'No contractor linked' }, { status: 403 });
  }

  const body = await request.json();
  const allowedFields = ['name', 'phone', 'email', 'website', 'description',
                         'services', 'materials', 'service_radius'];

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const field of allowedFields) {
    if (body[field] !== undefined) updates[field] = body[field];
  }

  const serviceClient = getServiceClient();
  const { error } = await serviceClient
    .from('contractors')
    .update(updates)
    .eq('id', profile.contractor_id);

  if (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
