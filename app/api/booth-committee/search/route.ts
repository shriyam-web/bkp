import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import LegislativeAssembly from '@/models/LegislativeAssembly';
import CommitteeMember from '@/models/CommitteeMember';
import { INDIAN_STATES } from '@/lib/indian-states';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim() || '';
    const state = searchParams.get('state')?.trim() || '';

    if (!q || q.length < 2) {
      return NextResponse.json({
        success: true,
        data: { states: [], assemblies: [], booths: [], members: [] },
      });
    }

    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const num = parseInt(q, 10);

    const assemblyFilter: Record<string, unknown> = {
      $or: [
        { 'name.en': regex },
        { 'name.hi': regex },
        { state: regex },
        ...(Number.isNaN(num) ? [] : [{ constituencyNumber: num }]),
      ],
    };
    if (state) assemblyFilter.state = state;

    const memberFilter: Record<string, unknown> = {
      type: 'BOOTH',
      $or: [
        { 'name.en': regex },
        { 'name.hi': regex },
        { 'position.en': regex },
        { 'position.hi': regex },
        { booth: regex },
        { constituency: regex },
        { state: regex },
      ],
    };
    if (state) memberFilter.state = state;

    const [assemblies, members] = await Promise.all([
      LegislativeAssembly.find(assemblyFilter)
        .sort({ state: 1, constituencyNumber: 1 })
        .limit(40)
        .lean(),
      CommitteeMember.find(memberFilter).sort({ state: 1, order: 1 }).limit(40).lean(),
    ]);

    const stateSet = new Set<string>();
    INDIAN_STATES.forEach((s) => {
      if (regex.test(s)) stateSet.add(s);
    });
    assemblies.forEach((a) => stateSet.add(a.state));
    members.forEach((m) => {
      if (m.state) stateSet.add(m.state);
    });

    const boothMap = new Map<string, { state: string; constituency: string; booth: string; count: number }>();
    members.forEach((m) => {
      if (!m.booth || !m.state || !m.constituency) return;
      const key = `${m.state}|${m.constituency}|${m.booth}`;
      const existing = boothMap.get(key);
      if (existing) existing.count += 1;
      else boothMap.set(key, { state: m.state, constituency: m.constituency, booth: m.booth, count: 1 });
    });

    const booths = Array.from(boothMap.values())
      .filter(
        (b) =>
          regex.test(b.booth) ||
          regex.test(b.constituency) ||
          regex.test(b.state) ||
          members.some(
            (m) =>
              m.booth === b.booth &&
              m.constituency === b.constituency &&
              m.state === b.state &&
              (regex.test(m.name?.en || '') || regex.test(m.name?.hi || ''))
          )
      )
      .slice(0, 30);

    return NextResponse.json({
      success: true,
      data: {
        states: Array.from(stateSet).sort(),
        assemblies,
        booths,
        members,
      },
    });
  } catch (error) {
    console.error('Booth committee search error:', error);
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}
