'use client';

import Link from 'next/link';
import { Landmark, Users, UserPlus, ArrowRight } from 'lucide-react';
import MemberForm from '@/components/admin/MemberForm';

export default function BoothCommitteeAdminPage() {
  const secondaryOptions = [
    {
      title: 'Legislative Assemblies',
      description: 'Browse auto-imported Vidhan Sabha constituencies by state.',
      href: '/admin/legislative-assemblies',
      icon: Landmark,
    },
    {
      title: 'Booth-wise Members',
      description: 'View, search, and edit members grouped by booth.',
      href: '/admin/booth-committee-members',
      icon: Users,
    },
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booth Level Committee</h1>
        <p className="text-gray-600">
          Register booth committee members with state, assembly, booth, post, photo, and address.
        </p>
      </div>

      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
            <UserPlus className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Register a New Member</h2>
            <p className="text-sm text-gray-500">Primary action — add booth committee members</p>
          </div>
        </div>

        <MemberForm
          type="BOOTH"
          embedded
          onClose={() => {}}
          onSuccess={() => {}}
        />
      </section>

      <section>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          More options
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {secondaryOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.href}
                href={option.href}
                className="group flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="p-2.5 rounded-lg bg-gray-50 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 mb-1">{option.title}</p>
                  <p className="text-sm text-gray-500 leading-snug">{option.description}</p>
                  <span className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-blue-600">
                    Open <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
