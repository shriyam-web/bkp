'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';
import { i18n, type Locale } from '@/i18n.config';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  isDark?: boolean;
}

export default function LanguageSwitcher({ isDark = false }: LanguageSwitcherProps) {
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

    const newPath = '/' + segments.join('/');
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded-md border font-bold text-[10px] tracking-tight uppercase transition-all duration-200",
        isDark 
          ? "bg-white/10 border-white/20 text-white hover:bg-white/20" 
          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-red-200 hover:text-red-600 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 dark:text-gray-300 dark:hover:border-red-900/50 dark:hover:text-red-400"
      )}
      title={currentLocale === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}
    >
      <Globe className="h-3 w-3" />
      <span>{currentLocale === 'en' ? 'हिन्दी' : 'ENG'}</span>
    </button>
  );
}
