import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import LegislativeAssembly from '@/models/LegislativeAssembly';
import CommitteeMember from '@/models/CommitteeMember';
import { INDIAN_STATES } from '@/lib/indian-states';
import { boothKey, normalizeBoothLabel } from '@/lib/normalize-booth';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim() || '';
    const state = searchParams.get('state')?.trim() || '';
    const scope = searchParams.get('scope')?.trim() || 'all';
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10) || 50, 80);

    if (!q || q.length < 2) {
      return NextResponse.json({
        success: true,
        data: { states: [], assemblies: [], booths: [], members: [] },
      });
    }

    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'i');
    const num = parseInt(q, 10);
    const wantStates = scope === 'all' || scope === 'states';
    const wantAssemblies = scope === 'all' || scope === 'assemblies';
    const wantBooths = scope === 'all' || scope === 'booths';
    const wantMembers = scope === 'all' || scope === 'members' || scope === 'booths';

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
        { mobileNumber: regex },
        { email: regex },
        { 'address.street': regex },
        { 'address.city': regex },
        { 'address.postalCode': regex },
        { district: regex },
      ],
    };
    if (state) memberFilter.state = state;

    const [assemblies, members] = await Promise.all([
      wantAssemblies || wantStates
        ? LegislativeAssembly.find(assemblyFilter)
            .sort({ state: 1, constituencyNumber: 1 })
            .limit(limit)
            .lean()
        : Promise.resolve([]),
      wantMembers || wantBooths || wantStates
        ? CommitteeMember.find(memberFilter).sort({ state: 1, order: 1 }).limit(limit).lean()
        : Promise.resolve([]),
    ]);

    const stateSet = new Set<string>();
    if (wantStates) {
      INDIAN_STATES.forEach((s) => {
        if (regex.test(s)) stateSet.add(s);
      });
      assemblies.forEach((a) => stateSet.add(a.state));
      members.forEach((m) => {
        if (m.state) stateSet.add(m.state);
      });
    }

    const boothMap = new Map<
      string,
      { state: string; constituency: string; booth: string; count: number }
    >();
    if (wantBooths) {
      members.forEach((m) => {
        const booth = normalizeBoothLabel(m.booth);
        if (!booth || !m.state || !m.constituency) return;
        const key = `${m.state}|${m.constituency}|${boothKey(booth)}`;
        const existing = boothMap.get(key);
        if (existing) existing.count += 1;
        else
          boothMap.set(key, {
            state: m.state,
            constituency: m.constituency,
            booth,
            count: 1,
          });
      });
    }

    const booths = Array.from(boothMap.values())
      .filter(
        (b) =>
          regex.test(b.booth) ||
          regex.test(b.constituency) ||
          regex.test(b.state) ||
          members.some(
            (m) =>
              boothKey(m.booth) === boothKey(b.booth) &&
              m.constituency === b.constituency &&
              m.state === b.state &&
              (regex.test(m.name?.en || '') ||
                regex.test(m.name?.hi || '') ||
                regex.test(m.mobileNumber || '') ||
                regex.test(m.position?.en || ''))
          )
      )
      .slice(0, 30);

    return NextResponse.json({
      success: true,
      data: {
        states: wantStates ? Array.from(stateSet).sort() : [],
        assemblies: wantAssemblies ? assemblies : [],
        booths: wantBooths ? booths : [],
        members: wantMembers && scope !== 'booths' ? members : wantMembers ? members : [],
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
