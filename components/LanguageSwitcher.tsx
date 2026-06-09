'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { i18n, type Locale } from '@/i18n.config';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  variant?: 'default' | 'dark' | 'pill';
}

export default function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = (pathname.split('/')[1] || i18n.defaultLocale) as Locale;

  const toggleLanguage = () => {
    const newLocale: Locale = currentLocale === 'en' ? 'hi' : 'en';
    const segments = pathname.split('/').filter(Boolean);

    if (segments[0] === 'en' || segments[0] === 'hi') {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    router.push('/' + segments.join('/'));
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={cn(
        'flex items-center gap-1.5 font-semibold text-xs transition-all',
        variant === 'default' &&
          'px-2.5 py-1.5 rounded-md border border-border bg-muted/50 text-foreground hover:border-red-600/40 hover:text-red-600',
        variant === 'dark' &&
          'px-2.5 py-1.5 rounded-md border border-slate-600 bg-slate-800 text-slate-200 hover:border-[#FACC15]/50 hover:text-[#FACC15]',
        variant === 'pill' &&
          'px-4 py-2 rounded-full border border-slate-600 bg-slate-800/80 text-slate-200 hover:bg-slate-700'
      )}
      title={currentLocale === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{currentLocale === 'en' ? 'हिन्दी' : 'English'}</span>
    </button>
  );
}
