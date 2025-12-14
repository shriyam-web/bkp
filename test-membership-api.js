const testData1 = {
  name: "Rajesh Kumar",
  age: 35,
  fathersOrHusbandsName: "Vinod Kumar",
  address: "123 Main Street, New Delhi",
  pincode: "110001",
  mobileNo: "+91 9876543210",
  voterIdCardNo: "VID123456789",
  date: new Date().toISOString().split('T')[0],
  membershipType: "Active Membership"
};

const testData2 = {
  name: "Priya Sharma",
  age: 28,
  fathersOrHusbandsName: "Rajesh Sharma",
  address: "456 Oak Road, Mumbai",
  pincode: "400001",
  mobileNo: "+91 8765432109",
  voterIdCardNo: "VID987654321",
  date: new Date().toISOString().split('T')[0],
  membershipType: "Normal Membership"
};

async function testAPI(testData, testNumber) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Test ${testNumber}: Membership Type - ${testData.membershipType}`);
  console.log(`${'='.repeat(60)}`);
  console.log('Sending data:', JSON.stringify(testData, null, 2));

  try {
    const response = await fetch('http://localhost:3000/api/membership', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('\n✅ API Test Successful!');
      console.log('Status:', response.status);
      console.log('Response Data:');
      console.log('  Name:', result.data.name);
      console.log('  Age:', result.data.age);
      console.log('  Membership Type:', result.data.membershipType);
      console.log('  Voter ID:', result.data.voterIdCardNo);
      console.log('  Created At:', result.data.createdAt);
    } else {
      console.log('\n❌ API Test Failed!');
      console.log('Status:', response.status);
      console.log('Error:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('\n❌ Error testing API:', error.message);
    console.log('Make sure the development server is running on http://localhost:3000');
  }
}

async function runTests() {
  console.log('\n🧪 MEMBERSHIP API TEST SUITE');
  console.log('Testing membership submission with different membership types\n');
  
  await testAPI(testData1, 1);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await testAPI(testData2, 2);
  
  console.log(`\n${'='.repeat(60)}`);
  console.log('✅ All tests completed!');
  console.log('Check MongoDB Atlas to verify data was saved correctly');
  console.log(`${'='.repeat(60)}\n`);
}

runTests();
