import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CommitteeMember from '@/models/CommitteeMember';
import Membership from '@/models/Membership';

export async function GET() {
  try {
    await dbConnect();
    
    const committeeStates = await CommitteeMember.distinct('state', { state: { $ne: null } });
    const membershipStates = await Membership.distinct('state', { state: { $ne: null } });
    
    const committeeDistricts = await CommitteeMember.distinct('district', { district: { $ne: null } });
    const membershipDistricts = await Membership.distinct('district', { district: { $ne: null } });

    const states = Array.from(new Set([...committeeStates, ...membershipStates]));
    const districts = Array.from(new Set([...committeeDistricts, ...membershipDistricts]));

    return NextResponse.json({ 
      success: true, 
      states: states.sort(),
      districts: districts.sort()
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
