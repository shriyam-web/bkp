const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_PHONE_NUMBER;
const to = process.env.TEST_PHONE_NUMBER || '+919648974867';

console.log('Testing with SID:', accountSid);

try {
  const client = twilio(accountSid, authToken);
  client.messages.create({
    body: 'Test Message',
    from: from,
    to: to
  }).then(message => {
    console.log('Success! SID:', message.sid);
  }).catch(err => {
    console.error('Twilio Error Catch:', err.message);
    console.error('Error Code:', err.code);
  });
} catch (e) {
  console.error('Initialization Error:', e.message);
}
