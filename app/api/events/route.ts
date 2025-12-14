import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const now = new Date();
    const events = await Event.find({ event_date: { $gte: now } })
      .sort({ event_date: 1 })
      .lean();

    return NextResponse.json(
      { success: true, data: events },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
