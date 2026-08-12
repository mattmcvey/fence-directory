import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabase = createClient(supabaseUrl, serviceKey);

  console.log('📧 Adding recent leads...\n');

  const leadsToAdd = [
    {
      contractor_name: 'Stand Strong Fencing of Tampa',
      homeowner_name: 'William Guzman',
      homeowner_email: 'guzman.william@gmail.com',
      homeowner_phone: '8132988386',
      zip_code: '33607',
      fence_type: 'privacy',
      material: 'wood',
      approximate_length: '144',
      message: 'The last hurricane we had in Tampa destroyed few of the wood panel',
    },
    {
      contractor_name: 'Next Level Decks and Exteriors',
      homeowner_name: 'Jon Bridges',
      homeowner_email: 'jonbridgessmith@gmail.com',
      homeowner_phone: '5037472621',
      zip_code: '97223',
      fence_type: 'privacy',
      material: 'chain-link',
      approximate_length: '170',
      message: 'Remove approx 20 4 x 4 wood posts and replace with black vinyl coated chain link on north and east side of property',
    },
    {
      contractor_name: 'Five Star Fence and Stain LLC',
      homeowner_name: 'Jessie Madrid',
      homeowner_email: 'jessmadrid87@gmail.com',
      homeowner_phone: '9099155385',
      zip_code: '37042',
      fence_type: 'privacy',
      material: 'vinyl',
      approximate_length: '25wx42L',
      message: 'I want a white fence I already got a professional surveyor to mark the land',
    },
    {
      contractor_name: 'Nomad Fence LLC',
      homeowner_name: 'Paul Frost',
      homeowner_email: 'detro8234@gmail.com',
      homeowner_phone: '3028977004',
      zip_code: '19804',
      fence_type: 'privacy',
      material: 'vinyl',
      approximate_length: '210 linear feet',
      message: '210 linear feet total but 59 feet is already vinyl privacy. Need 10ft double gate.',
    },
  ];

  for (const lead of leadsToAdd) {
    // Try to find contractor in database
    const { data: contractors } = await supabase
      .from('contractors')
      .select('id, name')
      .ilike('name', `%${lead.contractor_name.split(' ')[0]}%`)
      .limit(5);

    let contractorId = contractors?.[0]?.id;

    if (contractors && contractors.length > 0) {
      console.log(`   Found contractor: ${contractors[0].name}`);
    }

    const { data, error } = await supabase
      .from('leads_sent')
      .insert({
        contractor_id: contractorId,
        ...lead,
      })
      .select()
      .single();

    if (error) {
      console.log(`   ❌ Error adding lead for ${lead.contractor_name}:`);
      console.log(`      ${error.message}`);
    } else {
      console.log(`   ✅ Added: ${lead.homeowner_name} → ${lead.contractor_name}`);
    }
  }

  console.log('\n🎉 Done! Check /admin/leads-sent to view all leads.');
}

main();
