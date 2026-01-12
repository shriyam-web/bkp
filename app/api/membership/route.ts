import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Membership from '@/models/Membership';

function generateMemberId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BKP-${timestamp.toUpperCase()}-${randomStr}`;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    const memberId = generateMemberId();
    const membershipData = {
      ...body,
      memberId,
    };

    const membership = await Membership.create(membershipData);

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
