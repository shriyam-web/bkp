export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<boolean> {
  const fromEmail = process.env.FROM_EMAIL;
  const fromName = process.env.FROM_NAME || 'Organization';
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASSWORD;

  if (!smtpHost || !smtpUser || !smtpPass || !fromEmail) {
    console.log(`[SIMULATED EMAIL] To: ${to}, Subject: ${subject}`);
    console.log(`[SIMULATED EMAIL] From: ${fromName} <${fromEmail || 'not-configured'}>`);
    return true;
  }

  try {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to,
      subject,
      html,
    });

    console.log(`[EMAIL SENT] To: ${to}, Subject: ${subject}`);
    return true;
  } catch (error: any) {
    console.error(`[EMAIL FAILED] To: ${to}, Subject: ${subject}`);
    console.error(`[ERROR DETAILS]:`, error.message);
    return false;
  }
}
