import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabase = createClient(supabaseUrl, serviceKey);

  console.log('📧 Logging Georgia Fence Wholesale lead...\n');

  const { data: contractors } = await supabase
    .from('contractors')
    .select('id, name')
    .ilike('name', '%Georgia%Fence%Wholesale%')
    .limit(5);

  let contractorId = contractors?.[0]?.id;

  if (contractors && contractors.length > 0) {
    console.log(`   Found contractor: ${contractors[0].name}`);
  }

  const { data, error } = await supabase
    .from('leads_sent')
    .insert({
      contractor_id: contractorId,
      contractor_name: 'Georgia Fence Wholesale',
      homeowner_name: 'Roy Brown',
      homeowner_email: 'roybrown1730@gmail.com',
      homeowner_phone: '7073423971',
      zip_code: '31206',
      fence_type: 'garden',
      material: 'vinyl',
      approximate_length: '150',
      message: null,
    })
    .select()
    .single();

  if (error) {
    console.log(`   ❌ Error: ${error.message}`);
  } else {
    console.log(`   ✅ Lead logged: Roy Brown → Georgia Fence Wholesale`);
    console.log(`      Email: maconmanager@gafence.net, Phone: (478) 781-9524`);
  }
}

main();
