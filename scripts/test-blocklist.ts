import { config } from 'dotenv';
config({ path: '.env.local' });

async function testBlocklist() {
  console.log('🧪 Testing email blocklist...\n');

  const baseUrl = 'http://localhost:3000';

  // Test 1: Try to submit claim with blocked email
  console.log('Test 1: Submitting claim with blocked email (info@mdastra.com)...');
  const blockedClaimRes = await fetch(`${baseUrl}/api/claims`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      businessName: 'Test Business',
      contactName: 'Test',
      email: 'info@mdastra.com',
      phone: '1234567890',
      city: 'Test City',
      state: 'TX',
    }),
  });
  const blockedClaimResult = await blockedClaimRes.json();
  console.log(`   Status: ${blockedClaimRes.status}`);
  console.log(`   Response:`, blockedClaimResult);
  console.log(`   ✅ ${blockedClaimRes.status === 403 ? 'PASSED - Email blocked' : '❌ FAILED - Should be blocked'}\n`);

  // Test 2: Try to submit claim with non-blocked email
  console.log('Test 2: Submitting claim with normal email...');
  const normalClaimRes = await fetch(`${baseUrl}/api/claims`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      businessName: 'Test Business',
      contactName: 'Test',
      email: 'test@example.com',
      phone: '1234567890',
      city: 'Test City',
      state: 'TX',
    }),
  });
  const normalClaimResult = await normalClaimRes.json();
  console.log(`   Status: ${normalClaimRes.status}`);
  console.log(`   Response:`, normalClaimResult);
  console.log(`   ✅ ${normalClaimRes.status === 200 ? 'PASSED - Normal email allowed' : '❌ FAILED - Should be allowed'}\n`);

  console.log('✅ Tests complete!');
}

testBlocklist();
