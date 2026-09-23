import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabase = createClient(supabaseUrl, serviceKey);

  console.log('🚫 Banning MD Astra account...\n');

  // Get the user
  const { data: { users } } = await supabase.auth.admin.listUsers();
  const mdAstraUser = users?.find(u => u.email === 'mdastra02@gmail.com');
  
  if (!mdAstraUser) {
    console.log('❌ User not found');
    return;
  }

  // Ban the user using Supabase Auth's built-in ban feature
  const { data, error } = await supabase.auth.admin.updateUserById(
    mdAstraUser.id,
    { ban_duration: 'none' } // Permanently ban
  );

  if (error) {
    console.log('❌ Error banning user:', error.message);
  } else {
    console.log('✅ User banned successfully');
    console.log('   Email:', mdAstraUser.email);
    console.log('   User ID:', mdAstraUser.id);
    console.log('   They can no longer sign in or perform any actions');
  }
}

main();
