import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Membership from '@/models/Membership';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    const membership = await Membership.create(body);

    return NextResponse.json(
      { success: true, data: membership },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating membership:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create membership' },
      { status: 500 }
    );
  }
}
