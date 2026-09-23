import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabase = createClient(supabaseUrl, serviceKey);

  console.log('🔍 Checking MD Astra claim...\n');

  // Check claim_requests
  const { data: claim } = await supabase
    .from('claim_requests')
    .select('*')
    .eq('email', 'info@mdastra.com')
    .single();

  if (claim) {
    console.log('Claim found:', claim);
  }

  // Check if they have a user account
  const { data: { users }, error: userError } = await supabase.auth.admin.listUsers();
  const mdAstraUser = users?.find(u => u.email === 'info@mdastra.com');
  
  if (mdAstraUser) {
    console.log('\n✅ User account exists:', mdAstraUser.id);
  } else {
    console.log('\n❌ No user account found');
  }

  // Check contractors table for any associated contractor
  if (claim?.contractor_id) {
    const { data: contractor } = await supabase
      .from('contractors')
      .select('*')
      .eq('id', claim.contractor_id)
      .single();
    
    if (contractor) {
      console.log('\nContractor:', contractor);
    }
  }
}

main();
