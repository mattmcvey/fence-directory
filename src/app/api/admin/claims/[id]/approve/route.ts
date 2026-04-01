import { NextRequest, NextResponse } from 'next/server';
import { createAuthServerClient, getServiceClient } from '@/lib/supabase';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;
  const serviceClient = getServiceClient();

  // 1. Get the claim
  const { data: claim } = await serviceClient
    .from('claim_requests')
    .select('*')
    .eq('id', id)
    .single();

  if (!claim) return NextResponse.json({ error: 'Claim not found' }, { status: 404 });

  // 2. Create or find contractor record
  let contractorId = claim.contractor_id;
  if (!contractorId) {
    // New business — create contractor row
    const slug = claim.business_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const { data: newContractor, error: createErr } = await serviceClient
      .from('contractors')
      .insert({
        name: claim.business_name,
        slug: `${slug}-${claim.city.toLowerCase().replace(/\s+/g, '-')}-${claim.state.toLowerCase()}`,
        email: claim.email,
        phone: claim.phone,
        city: claim.city,
        state: claim.state,
        address: `${claim.city}, ${claim.state}`,
        website: claim.website,
        claimed: true,
      })
      .select('id')
      .single();

    if (createErr) return NextResponse.json({ error: 'Failed to create contractor' }, { status: 500 });
    contractorId = newContractor.id;
  } else {
    // Existing contractor — mark as claimed
    await serviceClient
      .from('contractors')
      .update({ claimed: true })
      .eq('id', contractorId);
  }

  // 3. Create auth user for the contractor
  const { data: authUser, error: authError } = await serviceClient.auth.admin.createUser({
    email: claim.email,
    email_confirm: true,
    user_metadata: { full_name: claim.contact_name, role: 'contractor' },
  });

  let userId: string | undefined;

  if (authError) {
    if (authError.message?.includes('already been registered') || authError.message?.includes('already exists')) {
      // User already exists — look up their ID
      const { data: existingUsers } = await serviceClient.auth.admin.listUsers();
      const existing = existingUsers?.users?.find((u) => u.email === claim.email);
      userId = existing?.id;
    } else {
      console.error('Auth user creation error:', authError.message);
    }
  } else {
    userId = authUser?.user?.id;
  }

  if (userId) {
    // 4. Link user to contractor
    await serviceClient
      .from('contractors')
      .update({ user_id: userId })
      .eq('id', contractorId);

    await serviceClient
      .from('profiles')
      .update({ contractor_id: contractorId })
      .eq('id', userId);

    // 5. Send password reset so contractor can set their password
    try {
      await serviceClient.auth.admin.generateLink({
        type: 'recovery',
        email: claim.email,
      });
    } catch {
      // Non-critical — they can use forgot password flow
    }
  }

  // 6. Update claim status
  await serviceClient
    .from('claim_requests')
    .update({ status: 'approved' })
    .eq('id', id);

  return NextResponse.json({ success: true, contractorId, userId });
}
