import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CommitteeMember from '@/models/CommitteeMember';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    const query = type ? { type } : {};
    const members = await CommitteeMember.find(query).sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    console.log('POST request received with body:', JSON.stringify(body, null, 2));
    const member = await CommitteeMember.create(body);
    console.log('Created member:', JSON.stringify(member, null, 2));
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}
