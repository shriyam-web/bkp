import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const news = await News.find({}).sort({ published_at: -1 }).lean();

    return NextResponse.json(
      { success: true, data: news },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
