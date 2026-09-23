import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabase = createClient(supabaseUrl, serviceKey);

  console.log('📧 Logging Jones Custom Fences lead...\n');

  const { data: contractors } = await supabase
    .from('contractors')
    .select('id, name')
    .ilike('name', '%Jones%Custom%Fence%')
    .limit(5);

  let contractorId = contractors?.[0]?.id;

  if (contractors && contractors.length > 0) {
    console.log(`   Found contractor: ${contractors[0].name}`);
  }

  const { data, error } = await supabase
    .from('leads_sent')
    .insert({
      contractor_id: contractorId,
      contractor_name: 'Jones Custom Fences, LLC',
      homeowner_name: 'Ben Udasco',
      homeowner_email: 'bayanihan333@gmail.com',
      homeowner_phone: '4782139444',
      zip_code: '31088',
      fence_type: 'privacy',
      material: 'wood',
      approximate_length: 'Warner Robins',
      message: 'For the backyard. Please give me a call to set up a visit.',
    })
    .select()
    .single();

  if (error) {
    console.log(`   ❌ Error: ${error.message}`);
  } else {
    console.log(`   ✅ Lead logged: Ben Udasco → Jones Custom Fences, LLC`);
    console.log(`      Owner: Eric Stephen Jones, Phone: 478-550-3824`);
  }
}

main();
