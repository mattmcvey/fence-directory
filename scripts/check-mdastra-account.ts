import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabase = createClient(supabaseUrl, serviceKey);

  console.log('🔍 Checking MD Astra account (mdastra02@gmail.com)...\n');

  // Check user account
  const { data: { users }, error } = await supabase.auth.admin.listUsers();
  const mdAstraUser = users?.find(u => u.email === 'mdastra02@gmail.com');
  
  if (mdAstraUser) {
    console.log('✅ User account found:');
    console.log('   ID:', mdAstraUser.id);
    console.log('   Email:', mdAstraUser.email);
    console.log('   Created:', mdAstraUser.created_at);
    console.log('   Metadata:', mdAstraUser.user_metadata);

    // Check if they have any contractors linked to this user
    const { data: contractors } = await supabase
      .from('contractors')
      .select('*')
      .eq('user_id', mdAstraUser.id);
    
    if (contractors && contractors.length > 0) {
      console.log('\n⚠️  Contractors linked to this account:', contractors);
    } else {
      console.log('\n✓ No contractors linked to this account');
    }

    // Check for any Stripe subscriptions (if you have that table)
    const { data: subscriptions } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', mdAstraUser.id);
    
    if (subscriptions && subscriptions.length > 0) {
      console.log('\n💳 Active subscriptions:', subscriptions);
    } else {
      console.log('\n✓ No active subscriptions');
    }
  } else {
    console.log('❌ No user account found with email mdastra02@gmail.com');
  }

  // Also check the claim with different email
  const { data: claim } = await supabase
    .from('claim_requests')
    .select('*')
    .eq('business_name', 'MD ASTRA')
    .single();

  if (claim) {
    console.log('\n📝 Claim request:');
    console.log('   Email used:', claim.email);
    console.log('   Status:', claim.status);
  }
}

main();
