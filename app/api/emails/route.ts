import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CommitteeMember from '@/models/CommitteeMember';
import Email from '@/models/Email';
import { sendEmail } from '@/lib/nodemailer';

function generateEmailHTML(subject: string, content: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-bottom: 2px solid #007bff;">
        <h1 style="color: #333; margin: 0;">${subject}</h1>
      </div>
      <div style="padding: 20px; background-color: #ffffff;">
        <div style="color: #555; line-height: 1.6; white-space: pre-wrap;">
          ${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
        </div>
      </div>
      <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
        <p style="margin: 5px 0;">This is an automated email from our organization.</p>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    console.log('Starting email POST request...');
    await dbConnect();
    console.log('Database connected');
    
    const body = await request.json();
    console.log('Request body:', body);
    const { subject, content, targetType, targetValue, customRecipients } = body;

    if (!subject || !content || !targetType) {
      throw new Error('Missing required fields: subject, content, targetType');
    }

    let recipientEmails: string[] = [];

    try {
      if (targetType === 'NATIONAL') {
        const committee = await CommitteeMember.find({ type: 'NATIONAL' });
        recipientEmails = committee.map(m => m.email).filter(Boolean);
      } else if (targetType === 'RASHTRIYA_PARISHAD') {
        const committee = await CommitteeMember.find({ type: 'RASHTRIYA_PARISHAD' });
        recipientEmails = committee.map(m => m.email).filter(Boolean);
      } else if (targetType === 'RASHTRIYA_KAARYASAMITI') {
        const committee = await CommitteeMember.find({ type: 'RASHTRIYA_KAARYASAMITI' });
        recipientEmails = committee.map(m => m.email).filter(Boolean);
      } else if (targetType === 'STATE') {
        const committee = await CommitteeMember.find({ 
          type: 'STATE',
          state: targetValue
        });
        recipientEmails = committee.map(m => m.email).filter(Boolean);
      } else if (targetType === 'DISTRICT') {
        const committee = await CommitteeMember.find({ 
          type: 'DISTRICT',
          district: targetValue
        });
        recipientEmails = committee.map(m => m.email).filter(Boolean);
      } else if (targetType === 'CUSTOM_LIST') {
        if (!customRecipients || customRecipients.length === 0) {
          throw new Error('Custom recipient list is empty');
        }
        recipientEmails = customRecipients.filter((email: string) => email && email.trim() !== '');
      }
    } catch (dbError: any) {
      console.error('Database query error:', dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    if (recipientEmails.length === 0) {
      throw new Error('No valid email addresses found for the selected audience');
    }

    const uniqueEmails = Array.from(new Set(recipientEmails));
    const totalRecipientCount = uniqueEmails.length;

    console.log(`Attempting to send emails to ${totalRecipientCount} addresses`);

    const emailHTML = generateEmailHTML(subject, content);
    
    const results = await Promise.all(
      uniqueEmails.map(async (to) => {
        try {
          const success = await sendEmail(to, subject, emailHTML);
          return { to, success };
        } catch (emailError: any) {
          console.error(`Email error for ${to}:`, emailError);
          return { to, success: false };
        }
      })
    );

    const successfulSends = results.filter(r => r.success).length;
    console.log(`Successfully sent ${successfulSends} out of ${totalRecipientCount}`);

    if (totalRecipientCount > 0 && successfulSends === 0) {
      console.warn('No emails were successfully sent. Check your SMTP configuration.');
    }

    const newEmail = await Email.create({
      subject,
      content,
      targetType,
      targetValue,
      recipientEmails: uniqueEmails,
      recipientCount: totalRecipientCount,
      successCount: successfulSends,
    });

    return NextResponse.json({ 
      success: true, 
      message: `Email sent to ${successfulSends} recipients`, 
      recipientCount: successfulSends,
      data: newEmail 
    });
  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const emails = await Email.find({}).sort({ sentAt: -1 });
    return NextResponse.json({ success: true, data: emails });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
