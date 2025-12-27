
async function testMembership(type) {
  console.log(`Testing membership type: ${type}`);
  const response = await fetch('http://localhost:3001/api/membership', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      age: 30,
      fathersOrHusbandsName: 'Father Name',
      address: 'Test Address',
      pincode: '123456',
      mobileNo: '9876543210',
      voterIdCardNo: 'ABC1234567',
      date: new Date().toISOString().split('T')[0],
      membershipType: type
    }),
  });

  const data = await response.json();
  console.log(`Response status: ${response.status}`);
  console.log('Response data:', data);
  return response.status;
}

async function runTests() {
  await testMembership('Active Membership');
  await testMembership('Normal Membership');
  await testMembership('Hamdard Membership');
}

runTests();
