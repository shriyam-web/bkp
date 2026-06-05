import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import LegislativeAssembly from '@/models/LegislativeAssembly';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');

    const filter = state ? { state } : {};
    const assemblies = await LegislativeAssembly.find(filter)
      .sort({ order: 1, constituencyNumber: 1, 'name.en': 1 })
      .lean();

    return NextResponse.json({ success: true, data: assemblies }, { status: 200 });
  } catch (error) {
    console.error('Error fetching legislative assemblies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch legislative assemblies' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { state, name, constituencyNumber, order } = await request.json();

    if (!state || !name?.en) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: state, name.en' },
        { status: 400 }
      );
    }

    const assembly = await LegislativeAssembly.create({
      state,
      name: { en: name.en, hi: name.hi || '' },
      constituencyNumber: constituencyNumber ?? null,
      order: order ?? 0,
    });

    return NextResponse.json({ success: true, data: assembly }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating legislative assembly:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'This assembly already exists for the selected state' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create legislative assembly' },
      { status: 500 }
    );
  }
}
