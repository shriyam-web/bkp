'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  LogOut,
  Menu,
  X,
  Send,
  FileText,
  Image as ImageIcon,
  Vote,
  Flag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AdminPoliticalBackdrop } from '@/components/admin/AdminPoliticalBackdrop';
import { adminDisplay, adminSans } from '@/lib/admin-fonts';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/national-committee', label: 'Top National Members', icon: Users },
    { href: '/admin/rashtriya-parishad', label: 'National Council', icon: Users },
    {
      href: '/admin/rashtriya-kaaryasamiti',
      label: 'National Executive Committee',
      icon: Users,
    },
    { href: '/admin/state-committee', label: 'State Committee', icon: Users },
    { href: '/admin/district-committee', label: 'District Committee', icon: Users },
    { href: '/admin/booth-committee', label: 'Booth Committee', icon: Vote },
    { href: '/admin/emailing', label: 'Email Center', icon: Send },
    { href: '/admin/press-release', label: 'Press Release', icon: FileText },
    { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  ];

  return (
    <div className={cn(adminSans.className, 'relative min-h-screen bg-white')}>
      <AdminPoliticalBackdrop className="fixed inset-0 z-0" />

      <div className="relative z-10 lg:hidden border-b border-neutral-200 bg-white/90 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#b91c1c]">
            <Flag className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className={cn(adminDisplay.className, 'truncate text-sm font-bold text-neutral-950')}>
              BKP Console
            </p>
            <p className="truncate text-[10px] uppercase tracking-wider text-[#b91c1c]">
              Admin
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="relative z-10 flex h-[100dvh] lg:h-screen overflow-hidden">
        {sidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/20 lg:hidden"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 flex w-[17.5rem] flex-col border-r border-neutral-200 bg-white/95 backdrop-blur-sm shadow-sm transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="h-1 shrink-0 bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#9a3412]" />

          <div className="border-b border-neutral-100 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#b91c1c] shadow-sm">
                <Flag className="h-5 w-5 text-white" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <h1
                  className={cn(
                    adminDisplay.className,
                    'truncate text-base font-bold leading-tight text-neutral-950'
                  )}
                >
                  Bahujan Kranti
                </h1>
                <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b91c1c]">
                  Party Admin
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-red-50 text-[#b91c1c]'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0',
                      isActive ? 'text-[#b91c1c]' : 'text-neutral-400'
                    )}
                  />
                  <span className="leading-snug">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-neutral-100 p-3">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        <main className="relative flex-1 overflow-y-auto">
          <div className="relative z-10 p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
