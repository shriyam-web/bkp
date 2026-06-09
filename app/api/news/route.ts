import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';
import { isAdminAuthenticated, unauthorizedResponse } from '@/lib/admin-auth';

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

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated()) return unauthorizedResponse();

  try {
    await dbConnect();

    const { title, excerpt, content, image_url, media_type, attachments } = await request.json();

    if (!title || !excerpt || !image_url) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, excerpt, image_url' },
        { status: 400 }
      );
    }

    const newNews = await News.create({
      title,
      excerpt,
      content: content || '',
      image_url,
      media_type: media_type || 'image',
      attachments: attachments || [],
      published_at: new Date(),
    });

    return NextResponse.json(
      { success: true, data: newNews },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create news' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!isAdminAuthenticated()) return unauthorizedResponse();

  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing id parameter' },
        { status: 400 }
      );
    }

    const { title, excerpt, content, image_url, media_type, attachments } = await request.json();

    const updatedNews = await News.findByIdAndUpdate(
      id,
      { title, excerpt, content, image_url, media_type, attachments },
      { new: true }
    );

    if (!updatedNews) {
      return NextResponse.json(
        { success: false, error: 'News not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedNews },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating news:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update news' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdminAuthenticated()) return unauthorizedResponse();

  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing id parameter' },
        { status: 400 }
      );
    }

    const result = await News.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'News not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'News deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete news' },
      { status: 500 }
    );
  }
}
