const twilio = require('twilio');
require('dotenv').config();

const client = twilio(
  'US113270056834c6b289f1708ae802bf3b', // Using what you provided
  'fd2cbf54be0ffd2cb523579fb72b1b52'
);

async function test() {
  try {
    console.log('Testing Twilio connection...');
    const message = await client.messages.create({
      body: 'Test message from BKP System',
      from: '+919648974867', // The number you provided
      to: '+919648974867'
    });
    console.log('Success! Message SID:', message.sid);
  } catch (error) {
    console.error('Twilio Error:', error.message);
    console.error('Full Error Code:', error.code);
    console.error('Status:', error.status);
    if (error.message.includes('not a valid SID')) {
        console.log('\nTIP: Your Account SID must start with "AC". "US..." is likely a Messaging Service SID.');
    }
    if (error.code === 21606) {
        console.log('\nTIP: The "From" number must be a Twilio-purchased number, not your own mobile number.');
    }
  }
}

test();
