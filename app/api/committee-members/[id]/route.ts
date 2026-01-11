import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CommitteeMember from '@/models/CommitteeMember';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await request.json();
    console.log('PUT request received with body:', JSON.stringify(body, null, 2));
    
    const updateData = {
      name: body.name,
      position: body.position,
      image: body.image,
      bio: body.bio,
      address: body.address,
      state: body.state,
      mobileNumber: body.mobileNumber,
      email: body.email,
      type: body.type,
      order: body.order,
    };
    
    const member = await CommitteeMember.findByIdAndUpdate(params.id, updateData, { new: true });
    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }
    console.log('Updated member:', JSON.stringify(member, null, 2));
    return NextResponse.json(member);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const member = await CommitteeMember.findByIdAndDelete(params.id);
    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Member deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
  }
}
