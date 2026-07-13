import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name:
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Signs Cloudinary upload params so the widget can upload large videos
 * without unsigned-preset size caps (often 10MB).
 */
export async function POST(request: Request) {
  try {
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const apiKey = process.env.CLOUDINARY_API_KEY;

    if (!apiSecret || !apiKey) {
      return NextResponse.json(
        {
          error:
            'Cloudinary API key/secret not configured. Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.',
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const paramsToSign = body?.paramsToSign;

    if (!paramsToSign || typeof paramsToSign !== 'object') {
      return NextResponse.json({ error: 'Missing paramsToSign' }, { status: 400 });
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      apiSecret
    );

    return NextResponse.json({ signature });
  } catch (error) {
    console.error('Cloudinary sign error:', error);
    return NextResponse.json({ error: 'Failed to sign upload' }, { status: 500 });
  }
}
