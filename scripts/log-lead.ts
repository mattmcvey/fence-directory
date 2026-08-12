#!/usr/bin/env tsx
/**
 * Quick script to log a lead sent to a contractor
 * Usage: npx tsx scripts/log-lead.ts
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabase = createClient(supabaseUrl, serviceKey);

  console.log('\n📧 Log Lead Sent to Contractor\n');

  // Get contractor name
  const contractorName = await prompt('Contractor name: ');
  if (!contractorName) {
    console.log('❌ Contractor name is required');
    rl.close();
    return;
  }

  // Try to find contractor in database
  const { data: contractors } = await supabase
    .from('contractors')
    .select('id, name, city, state')
    .ilike('name', `%${contractorName}%`)
    .limit(5);

  let contractorId: string | undefined;
  if (contractors && contractors.length > 0) {
    console.log(`\nFound ${contractors.length} matching contractor(s):`);
    contractors.forEach((c, i) => {
      console.log(`  ${i + 1}. ${c.name} - ${c.city}, ${c.state}`);
    });
    const selection = await prompt('\nSelect contractor (number) or press Enter to skip: ');
    const index = parseInt(selection) - 1;
    if (index >= 0 && index < contractors.length) {
      contractorId = contractors[index].id;
      console.log(`✓ Selected: ${contractors[index].name}`);
    }
  }

  // Get homeowner details
  const homeownerName = await prompt('\nHomeowner name: ');
  const homeownerEmail = await prompt('Homeowner email: ');
  const homeownerPhone = await prompt('Homeowner phone (optional): ');
  const zipCode = await prompt('ZIP code: ');
  const fenceType = await prompt('Fence type (optional): ');
  const material = await prompt('Material (optional): ');
  const approximateLength = await prompt('Approximate length (optional): ');
  const message = await prompt('Message/notes (optional): ');

  if (!homeownerName || !homeownerEmail || !zipCode) {
    console.log('❌ Homeowner name, email, and ZIP code are required');
    rl.close();
    return;
  }

  // Insert the lead
  const { data, error } = await supabase
    .from('leads_sent')
    .insert({
      contractor_id: contractorId,
      contractor_name: contractorName,
      homeowner_name: homeownerName,
      homeowner_email: homeownerEmail,
      homeowner_phone: homeownerPhone || null,
      zip_code: zipCode,
      fence_type: fenceType || null,
      material: material || null,
      approximate_length: approximateLength || null,
      message: message || null,
    })
    .select()
    .single();

  if (error) {
    console.log('\n❌ Error logging lead:', error.message);
  } else {
    console.log('\n✅ Lead logged successfully!');
    console.log(`   ID: ${data.id}`);
    console.log(`   Sent to: ${contractorName}`);
    console.log(`   For: ${homeownerName} (${zipCode})`);
  }

  rl.close();
}

main();
