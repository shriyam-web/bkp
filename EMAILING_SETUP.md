# Email System Setup Guide

## Overview
The email system has been implemented using Nodemailer, replacing the previous SMS-based messaging system.

## Features Implemented

1. **Email Model** (`models/Email.ts`)
   - Stores email history with subject, content, target type, and recipient list
   - Tracks success count and total recipient count

2. **Nodemailer Integration** (`lib/nodemailer.ts`)
   - SMTP configuration from environment variables
   - Graceful fallback to simulated emails if credentials not configured
   - Reusable `sendEmail()` function

3. **Email API** (`app/api/emails/route.ts`)
   - POST: Send emails with HTML formatting
   - GET: Retrieve email history
   - Support for targeted sending to committee members

4. **Member Fetching API** (`app/api/emails/members/route.ts`)
   - Returns members with email addresses
   - Supports filtering by type, state, and district

5. **Email UI Page** (`app/admin/emailing/page.tsx`)
   - Category selection (National, State, District, Councils, etc.)
   - **Interactive member list with checkboxes** to select/deselect members
   - "Select All" option for bulk selection
   - Subject and content composition
   - Email sending history display
   - Success/failure tracking

## Environment Variables Required

Add these to your `.env.local` file:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=noreply@yourorganization.com
FROM_NAME=Your Organization Name
MONGODB_URI=your-mongodb-uri
```

### SMTP Configuration Examples

**Gmail:**
- Host: `smtp.gmail.com`
- Port: `587`
- User: Your Gmail address
- Password: App-specific password (not your main password)
- Enable: "Less secure app access" or use App Password

**Other Providers:**
- Outlook: `smtp-mail.outlook.com:587`
- SendGrid: `smtp.sendgrid.net:587`
- AWS SES: `email-smtp.region.amazonaws.com:587`

## Installation

First, install Nodemailer:

```bash
npm install nodemailer @types/nodemailer
```

## How to Use

1. Go to `/admin/emailing` in the admin dashboard
2. Select a committee category (National, State, District, etc.)
3. Optionally select a specific state/district
4. Click "Select Members" to expand the member list
5. Check/uncheck individual members or use "Select All"
6. Enter subject and content
7. Click "Send Email"

## Email Behavior

- **With SMTP configured:** Emails are sent via your SMTP provider
- **Without SMTP configured:** Emails are logged to console (simulated) - useful for development

## Files Modified/Created

- **Created:**
  - `models/Email.ts` - Email history model
  - `lib/nodemailer.ts` - Email sending utility
  - `app/api/emails/route.ts` - Email API endpoints
  - `app/api/emails/members/route.ts` - Member list API
  - `app/admin/emailing/page.tsx` - Email UI page

- **Modified:**
  - `app/admin/dashboard/page.tsx` - Updated link from "Messaging" to "Email Center"

## Testing

To test without real SMTP:

1. Leave SMTP credentials unconfigured
2. Check the server console logs for simulated email output
3. Emails will show as successful in the UI

To test with real SMTP:

1. Configure environment variables
2. Send emails to your test recipients
3. Check email inbox
