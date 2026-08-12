import { NextRequest, NextResponse } from 'next/server';
import { createAuthServerClient, getServiceClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  // Verify admin
  const supabase = await createAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await request.json();
  const {
    contractor_id,
    contractor_name,
    homeowner_name,
    homeowner_email,
    homeowner_phone,
    zip_code,
    fence_type,
    material,
    approximate_length,
    message,
  } = body;

  // Validate required fields
  if (!contractor_name || !homeowner_name || !homeowner_email || !zip_code) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const serviceClient = getServiceClient();

  // Log the lead
  const { data, error } = await serviceClient
    .from('leads_sent')
    .insert({
      contractor_id,
      contractor_name,
      homeowner_name,
      homeowner_email,
      homeowner_phone,
      zip_code,
      fence_type,
      material,
      approximate_length,
      message,
    })
    .select()
    .single();

  if (error) {
    console.error('Error logging lead:', error);
    return NextResponse.json({ error: 'Failed to log lead' }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}
