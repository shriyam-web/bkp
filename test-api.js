
async function test() {
  const payload = {
    subject: "Test Subject",
    content: "Real SMS Test Content",
    targetType: "SPECIFIC_USER",
    targetValue: "+919648974867"
  };

  try {
    const response = await fetch('http://localhost:3000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

test();
