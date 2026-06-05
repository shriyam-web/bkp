'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MemberList from '@/components/admin/MemberList';

export default function BoothCommitteeMembersPage() {
  return (
    <div>
      <Link
        href="/admin/booth-committee"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Register Member
      </Link>
      <MemberList type="BOOTH" title="Booth-wise Members" />
    </div>
  );
}
