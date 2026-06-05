'use client';

import Link from 'next/link';
import { Landmark, Vote, Users, Clock, ArrowRight } from 'lucide-react';

export default function BoothCommitteeAdminPage() {
  const sections = [
    {
      title: 'Legislative Assemblies',
      description:
        'Add and manage Vidhan Sabha constituencies for each state. This powers the public state → assembly selection flow.',
      status: 'active' as const,
      href: '/admin/legislative-assemblies',
      icon: Landmark,
      color: 'orange',
    },
    {
      title: 'Booths',
      description:
        'Manage polling booths per legislative assembly. Each assembly typically has 350–450 booths.',
      status: 'coming_soon' as const,
      href: null,
      icon: Vote,
      color: 'blue',
    },
    {
      title: 'Booth Committee Members',
      description:
        'Add booth committee members with name, post, photo, and address. 1–15 members per booth.',
      status: 'active' as const,
      href: '/admin/booth-committee-members',
      icon: Users,
      color: 'green',
    },
  ];

  const colorMap: Record<string, string> = {
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booth Level Committee</h1>
        <p className="text-gray-600">
          Manage the full booth committee hierarchy: State → Legislative Assembly → Booth → Committee
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = section.status === 'active';

          const card = (
            <div
              className={`p-6 rounded-xl border h-full ${
                isActive
                  ? 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all'
                  : 'bg-gray-50 border-gray-200 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorMap[section.color]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                {!isActive && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                    <Clock className="h-3 w-3" />
                    Coming Soon
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{section.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{section.description}</p>
              {isActive && (
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                  Manage <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </div>
          );

          return isActive && section.href ? (
            <Link key={section.title} href={section.href} className="block group">
              {card}
            </Link>
          ) : (
            <div key={section.title}>{card}</div>
          );
        })}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-2">Current progress</h3>
        <ul className="text-sm text-gray-700 space-y-1.5">
          <li>✅ Legislative assemblies auto-imported for all states</li>
          <li>✅ Booth committee members — add name, post, photo, address</li>
          <li>⏳ Booths per assembly — coming next</li>
          <li>⏳ Public booth + committee display — coming next</li>
        </ul>
      </div>
    </div>
  );
}
