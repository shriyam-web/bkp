'use client';

import { useState, useEffect } from 'react';
import { Landmark, Loader2, Search, Database } from 'lucide-react';
import { INDIAN_STATES } from '@/lib/indian-states';

interface LegislativeAssembly {
  _id: string;
  state: string;
  name: { en: string; hi: string };
  constituencyNumber?: number | null;
  order: number;
}

export default function LegislativeAssembliesPage() {
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [assemblies, setAssemblies] = useState<LegislativeAssembly[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [fetching, setFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/legislative-assemblies')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setTotalCount(d.data.length);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedState) return;
    setFetching(true);
    fetch(`/api/legislative-assemblies?state=${encodeURIComponent(selectedState)}`)
      .then((r) => r.json())
      .then((d) => setAssemblies(d.success ? d.data : []))
      .catch(() => setAssemblies([]))
      .finally(() => setFetching(false));
  }, [selectedState]);

  const filtered = assemblies.filter((a) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.name.en.toLowerCase().includes(q) ||
      (a.name.hi || '').toLowerCase().includes(q) ||
      (a.constituencyNumber?.toString() || '').includes(q)
    );
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Legislative Assemblies</h1>
        <p className="text-gray-600">
          Auto-imported Vidhan Sabha constituencies for all states — no manual entry needed
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 flex items-start gap-3">
        <Database className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-gray-900">
            {totalCount != null
              ? `${totalCount.toLocaleString()} assemblies loaded across India`
              : 'Loading assembly data...'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Data sourced from public ECI electoral constituency records. To refresh, run{' '}
            <code className="bg-white px-1.5 py-0.5 rounded text-xs">npm run seed:assemblies</code>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select State</label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSearchQuery('');
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or number..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Landmark className="h-5 w-5 text-orange-600" />
          <h2 className="text-lg font-bold text-gray-900">
            {selectedState} — {assemblies.length} assemblies
            {searchQuery && ` (${filtered.length} matching)`}
          </h2>
        </div>

        {fetching ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Landmark className="h-10 w-10 mx-auto mb-3 text-gray-300" />
            <p>No assemblies found. Run the seed script to import data.</p>
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-50">
                <tr className="border-b border-gray-200 text-left text-gray-500">
                  <th className="pb-3 pr-4 pl-2 font-semibold">#</th>
                  <th className="pb-3 pr-4 font-semibold">Assembly Name</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((assembly) => (
                  <tr key={assembly._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 pr-4 pl-2 text-gray-500 w-16">
                      {assembly.constituencyNumber ?? '—'}
                    </td>
                    <td className="py-2.5 pr-4 font-medium text-gray-900">
                      {assembly.name.en}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
