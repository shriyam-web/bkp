import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const gallery = await Gallery.find({}).sort({ order: 1 }).lean();

    return NextResponse.json(
      { success: true, data: gallery },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { title, image_url, order } = await request.json();

    if (!title || !image_url) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, image_url' },
        { status: 400 }
      );
    }

    const newGallery = await Gallery.create({
      title,
      image_url,
      order: order || 0,
    });

    return NextResponse.json(
      { success: true, data: newGallery },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating gallery:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create gallery' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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

    const { title, image_url, order } = await request.json();

    const updatedGallery = await Gallery.findByIdAndUpdate(
      id,
      { title, image_url, order },
      { new: true }
    );

    if (!updatedGallery) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedGallery },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating gallery:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update gallery' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
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

    const result = await Gallery.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Gallery item deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting gallery:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete gallery' },
      { status: 500 }
    );
  }
}
