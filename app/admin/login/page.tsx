'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Flag, Lock, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AdminPoliticalBackdrop } from '@/components/admin/AdminPoliticalBackdrop';
import { adminDisplay, adminSans } from '@/lib/admin-fonts';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        adminSans.className,
        'relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-4 py-10'
      )}
    >
      <AdminPoliticalBackdrop />

      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#9a3412]" />

      <div className="relative w-full max-w-[420px]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#b91c1c] shadow-md shadow-red-200 ring-1 ring-red-900/10">
            <Flag className="h-7 w-7 text-white" strokeWidth={1.75} />
          </div>
          <h1
            className={cn(
              adminDisplay.className,
              'text-[1.65rem] sm:text-[1.85rem] font-bold text-neutral-950 tracking-tight leading-tight'
            )}
          >
            Bahujan Kranti Party
          </h1>
          <p className="mt-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#b91c1c]">
            Marxwaad — Ambedkarwaad
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white/90 shadow-xl shadow-neutral-200/60 backdrop-blur-[2px] overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#9a3412]" />

          <div className="px-6 sm:px-8 pt-7 pb-8">
            <div className="mb-6 flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#b91c1c]">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <h2
                  className={cn(
                    adminDisplay.className,
                    'text-xl font-bold text-neutral-950'
                  )}
                >
                  Admin Console
                </h2>
                <p className="mt-0.5 text-sm text-neutral-500">
                  Secure access for party administrators
                </p>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-username"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-500"
                >
                  Username
                </label>
                <input
                  id="admin-username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-[15px] text-neutral-900 outline-none transition focus:border-[#b91c1c] focus:bg-white focus:ring-2 focus:ring-red-500/15"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-500"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 pr-11 text-[15px] text-neutral-900 outline-none transition focus:border-[#b91c1c] focus:bg-white focus:ring-2 focus:ring-red-500/15"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#b91c1c] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-red-200 transition hover:bg-[#991b1b] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:opacity-60"
              >
                {loading ? (
                  'Signing in…'
                ) : (
                  <>
                    <Lock className="h-4 w-4 opacity-90" />
                    Sign in to Console
                    <ArrowRight className="h-4 w-4 opacity-80 transition group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          <Link href="/en" className="hover:text-[#b91c1c] transition-colors">
            ← Back to public website
          </Link>
        </p>
      </div>
    </div>
  );
}
