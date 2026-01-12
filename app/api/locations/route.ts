import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CommitteeMember from '@/models/CommitteeMember';
import Membership from '@/models/Membership';

export async function GET() {
  try {
    await dbConnect();
    
    const committeeStates = await CommitteeMember.distinct('state', { state: { $nin: [null, ''] } });
    const membershipStates = await Membership.distinct('state', { state: { $nin: [null, ''] } });
    
    const committeeDistricts = await CommitteeMember.distinct('district', { district: { $nin: [null, ''] } });
    const membershipDistricts = await Membership.distinct('district', { district: { $nin: [null, ''] } });

    const states = Array.from(new Set([...committeeStates, ...membershipStates]))
      .filter(s => s && typeof s === 'string' && s.trim() !== '')
      .sort();
    const districts = Array.from(new Set([...committeeDistricts, ...membershipDistricts]))
      .filter(d => d && typeof d === 'string' && d.trim() !== '')
      .sort();

    return NextResponse.json({ 
      success: true, 
      states: states,
      districts: districts
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
