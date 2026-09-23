import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabase = createClient(supabaseUrl, serviceKey);

  console.log('📧 Logging Superior Fence & Rail lead...\n');

  const { data: contractors } = await supabase
    .from('contractors')
    .select('id, name')
    .ilike('name', '%Superior%Fence%Rail%Memphis%')
    .limit(5);

  let contractorId = contractors?.[0]?.id;

  if (contractors && contractors.length > 0) {
    console.log(`   Found contractor: ${contractors[0].name}`);
  }

  const { data, error } = await supabase
    .from('leads_sent')
    .insert({
      contractor_id: contractorId,
      contractor_name: 'Superior Fence & Rail of Memphis',
      homeowner_name: 'Mike Haggard',
      homeowner_email: 'mike.mansfieldhoa@gmail.com',
      homeowner_phone: '901-483-2353',
      zip_code: '38017',
      fence_type: 'privacy',
      material: null,
      approximate_length: '1900 linear feet',
      message: 'Perimeter fence for homeowner association. Fencing installed between permanent brick columns.',
    })
    .select()
    .single();

  if (error) {
    console.log(`   ❌ Error: ${error.message}`);
  } else {
    console.log(`   ✅ Lead logged: Mike Haggard (HOA) → Superior Fence & Rail of Memphis`);
    console.log(`      Email: memphis@superiorfenceandrail.com, Phone: (901) 664-2848`);
  }
}

main();
