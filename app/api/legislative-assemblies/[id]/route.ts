import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import LegislativeAssembly from '@/models/LegislativeAssembly';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { state, name, constituencyNumber, order } = await request.json();

    const updated = await LegislativeAssembly.findByIdAndUpdate(
      params.id,
      {
        ...(state && { state }),
        ...(name && { name: { en: name.en, hi: name.hi || '' } }),
        ...(constituencyNumber !== undefined && { constituencyNumber }),
        ...(order !== undefined && { order }),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Legislative assembly not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating legislative assembly:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'This assembly already exists for the selected state' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update legislative assembly' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const deleted = await LegislativeAssembly.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Legislative assembly not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Legislative assembly deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting legislative assembly:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete legislative assembly' },
      { status: 500 }
    );
  }
}
