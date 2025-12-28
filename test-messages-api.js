const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing /api/messages POST endpoint...');
    
    const response = await fetch('http://localhost:3000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: 'Test Message',
        content: 'This is a test message',
        targetType: 'NATIONAL',
        targetValue: ''
      })
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();
