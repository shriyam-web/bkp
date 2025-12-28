import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CommitteeMember from '@/models/CommitteeMember';
import Membership from '@/models/Membership';
import Message from '@/models/Message';
import twilio from 'twilio';

async function sendSMS(to: string, body: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  // If credentials are not provided or invalid format, we just log it (useful for development)
  // Twilio Account SIDs usually start with 'AC', but some subaccounts might use different prefixes
  const isValidSid = sid && (sid.startsWith('AC') || sid.startsWith('US'));
  if (!sid || !token || !from || sid === 'your_account_sid' || !isValidSid) {
    console.log(`[SIMULATED SMS] To: ${to}, Body: ${body}`);
    if (sid && sid !== 'your_account_sid' && !isValidSid) {
      console.warn(`Warning: TWILIO_ACCOUNT_SID prefix not recognized. Current value: ${sid}. SMS sending is simulated.`);
    }
    return true;
  }

  try {
    const client = twilio(sid, token);
    console.log(`Attempting to send real SMS via Twilio to ${to}...`);
    console.log(`Credentials: SID=${sid.substring(0, 5)}..., From=${from}`);
    const result = await client.messages.create({
      body,
      from: from,
      to: to.startsWith('+') ? to : `+91${to}` // Assuming India if no country code
    });
    console.log('Twilio response SID:', result.sid);
    return true;
  } catch (error: any) {
    // This will be caught in the POST catch block and returned as 500 error message
    const errorDetails = `Twilio Error: ${error.message} (Code: ${error.code})`;
    console.error(errorDetails);
    throw new Error(errorDetails);
  }
}

export async function POST(request: Request) {
  try {
    console.log('Starting message POST request...');
    await dbConnect();
    console.log('Database connected');
    
    const body = await request.json();
    console.log('Request body:', body);
    const { subject, content, targetType, targetValue } = body;

    if (!subject || !content || !targetType) {
      throw new Error('Missing required fields: subject, content, targetType');
    }

    let phoneNumbers: string[] = [];

    try {
      if (targetType === 'NATIONAL') {
        const committee = await CommitteeMember.find({ type: 'NATIONAL' });
        phoneNumbers = committee.map(m => m.mobileNumber).filter(Boolean);
      } else if (targetType === 'STATE') {
        const committee = await CommitteeMember.find({ 
          $or: [
            { type: 'STATE', state: targetValue },
            { type: 'RASHTRIYA_PARISHAD', state: targetValue },
            { type: 'RASHTRIYA_KAARYASAMITI', state: targetValue }
          ]
        });
        const members = await Membership.find({ state: targetValue });
        phoneNumbers = [
          ...committee.map(m => m.mobileNumber),
          ...members.map(m => m.mobileNo)
        ].filter(Boolean);
      } else if (targetType === 'DISTRICT') {
        const committee = await CommitteeMember.find({ 
          type: 'DISTRICT',
          district: targetValue
        });
        const members = await Membership.find({ district: targetValue });
        phoneNumbers = [
          ...committee.map(m => m.mobileNumber),
          ...members.map(m => m.mobileNo)
        ].filter(Boolean);
      } else if (targetType === 'SPECIFIC_USER') {
        phoneNumbers = [targetValue];
      } else if (targetType === 'ALL_MEMBERS') {
        const committee = await CommitteeMember.find({});
        const members = await Membership.find({});
        phoneNumbers = [
          ...committee.map(m => m.mobileNumber),
          ...members.map(m => m.mobileNo)
        ].filter(Boolean);
      }
    } catch (dbError: any) {
      console.error('Database query error:', dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    // Remove duplicates and filter empty numbers
    const uniquePhoneNumbers = Array.from(new Set(phoneNumbers.filter(Boolean)));
    const totalRecipientCount = uniquePhoneNumbers.length;

    console.log(`Attempting to send messages to ${totalRecipientCount} numbers:`, uniquePhoneNumbers);

    // Send SMS to each recipient
    const smsBody = `${subject}\n\n${content}`;
    const results = await Promise.all(
      uniquePhoneNumbers.map(async (to) => {
        try {
          const success = await sendSMS(to, smsBody);
          return { to, success };
        } catch (smsError: any) {
          console.error(`SMS error for ${to}:`, smsError);
          return { to, success: false };
        }
      })
    );

    const successfulSends = results.filter(r => r.success).length;
    console.log(`Successfully sent ${successfulSends} out of ${totalRecipientCount}`);

    if (totalRecipientCount > 0 && successfulSends === 0) {
      throw new Error('Failed to send SMS to any recipients. Check your Twilio credentials and from number.');
    }

    const newMessage = await Message.create({
      subject,
      content,
      targetType,
      targetValue,
      recipientCount: successfulSends
    });

    return NextResponse.json({ 
      success: true, 
      message: `Message sent to ${successfulSends} recipients`, 
      recipientCount: successfulSends,
      data: newMessage 
    });
  } catch (error: any) {
    console.error('Messaging error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const messages = await Message.find({}).sort({ sentAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
