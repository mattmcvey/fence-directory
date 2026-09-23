import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabase = createClient(supabaseUrl, serviceKey);

  console.log('📧 Logging Gabriel\'s Fence lead...\n');

  // Try to find contractor in database
  const { data: contractors } = await supabase
    .from('contractors')
    .select('id, name')
    .ilike('name', '%Gabriel%Fence%')
    .limit(5);

  let contractorId = contractors?.[0]?.id;

  if (contractors && contractors.length > 0) {
    console.log(`   Found contractor: ${contractors[0].name}`);
  }

  const { data, error } = await supabase
    .from('leads_sent')
    .insert({
      contractor_id: contractorId,
      contractor_name: "Gabriel's Fence",
      homeowner_name: 'Daziana Velasquez',
      homeowner_email: 'daziana20@gmail.com',
      homeowner_phone: '3305079556',
      zip_code: '44515',
      fence_type: 'privacy',
      material: 'vinyl',
      approximate_length: '219',
      message: 'We currently have a chain link fence that was installed 2019 and would like it replaced with a white vinyl privacy fence. Will need tear down and disposal. Already have one proposal and comparing options.',
    })
    .select()
    .single();

  if (error) {
    console.log(`   ❌ Error: ${error.message}`);
  } else {
    console.log(`   ✅ Lead logged: Daziana Velasquez → Gabriel's Fence`);
    console.log(`      (Note: No email found, recommend calling 330-718-4503)`);
  }
}

main();
