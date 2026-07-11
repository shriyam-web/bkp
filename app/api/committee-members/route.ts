import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CommitteeMember from '@/models/CommitteeMember';
import {
  boothKey,
  normalizeBoothLabel,
  pickCanonicalBoothLabels,
} from '@/lib/normalize-booth';

async function healBoothLabels(
  members: Array<{ _id: unknown; booth?: string | null }>
) {
  const canonical = pickCanonicalBoothLabels(members.map((m) => m.booth));
  const ops: Promise<unknown>[] = [];

  for (const member of members) {
    if (!member.booth) continue;
    const target = canonical.get(boothKey(member.booth));
    if (!target || member.booth === target) continue;
    member.booth = target;
    ops.push(
      CommitteeMember.updateOne(
        { _id: member._id },
        { $set: { booth: target } }
      )
    );
  }

  if (ops.length > 0) {
    await Promise.allSettled(ops);
  }
}

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const state = searchParams.get('state');
    const district = searchParams.get('district');
    const constituency = searchParams.get('constituency');
    const booth = searchParams.get('booth');

    const query: Record<string, unknown> = {};
    if (type) query.type = type;
    if (state) query.state = state;
    if (district) query.district = district;
    if (constituency) query.constituency = constituency;

    const normalizedBooth = normalizeBoothLabel(booth);
    if (normalizedBooth) {
      // Match exact + common near-duplicates for this booth
      query.$or = [
        { booth: normalizedBooth },
        { booth: new RegExp(`^\\s*${normalizedBooth.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i') },
      ];
    }

    const members = await CommitteeMember.find(query).sort({ order: 1, createdAt: -1 });

    if (type === 'BOOTH' || members.some((m) => m.type === 'BOOTH' && m.booth)) {
      await healBoothLabels(members);
    }

    // If booth filter was used, also include members that normalize to the same key
    // after healing (already healed in place). Filter client-safe:
    if (normalizedBooth) {
      const key = boothKey(normalizedBooth);
      const filtered = members.filter((m) => boothKey(m.booth) === key);
      return NextResponse.json(filtered);
    }

    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    if (typeof body.booth === 'string') {
      body.booth = normalizeBoothLabel(body.booth);
    }
    const member = await CommitteeMember.create(body);
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}
