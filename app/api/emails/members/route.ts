import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CommitteeMember from '@/models/CommitteeMember';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const state = searchParams.get('state');
    const district = searchParams.get('district');
    
    const query: any = {};
    if (type) query.type = type;
    if (state) query.state = state;
    if (district) query.district = district;
    
    const members = await CommitteeMember.find(query)
      .select('_id name email mobileNumber type state district')
      .sort({ order: 1, createdAt: -1 });
    
    const membersWithEmail = members.filter(m => m.email);
    
    return NextResponse.json({
      success: true,
      data: membersWithEmail,
      total: membersWithEmail.length
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch members' }, { status: 500 });
  }
}
