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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = (pathname.split('/')[1] || i18n.defaultLocale) as Locale;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (newLocale: Locale) => {
    const segments = pathname.split('/').filter(Boolean);
    
    if (segments[0] === 'en' || segments[0] === 'hi') {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    const newPath = '/' + segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-500 border font-black text-[10px] tracking-widest uppercase",
          isDark 
            ? "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md" 
            : "bg-gray-50 border-gray-200 text-gray-900 hover:border-red-200 hover:bg-white shadow-sm"
        )}
        title="Switch Language"
      >
        <div className={cn(
          "flex items-center justify-center p-1 rounded-full transition-all duration-300",
          isDark ? "bg-white/10 group-hover:bg-red-500" : "bg-white group-hover:bg-red-50 shadow-sm"
        )}>
          <Globe className={cn(
            "h-3 w-3",
            isDark ? "text-white" : "text-gray-600 group-hover:text-red-600"
          )} />
        </div>
        <span className="ml-1">{currentLocale === 'en' ? 'EN' : 'HI'}</span>
        <ChevronDown className={cn(
          "h-3 w-3 transition-transform duration-500 opacity-40 group-hover:opacity-100",
          isOpen ? "rotate-180" : "rotate-0"
        )} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-48 origin-top-right rounded-2xl bg-white/95 backdrop-blur-xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 focus:outline-none z-50 animate-in fade-in zoom-in slide-in-from-top-2 duration-300">
          <div className="px-3 py-2 text-[9px] font-black uppercase tracking-[0.25em] text-gray-400 mb-1 border-b border-gray-50">
            Language
          </div>
          {i18n.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLanguage(locale)}
              className={cn(
                "group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-200",
                currentLocale === locale
                  ? "bg-red-50 text-red-600 font-bold"
                  : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg transition-colors font-black text-[10px]",
                  currentLocale === locale ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400 group-hover:bg-red-50 group-hover:text-red-600"
                )}>
                  {locale.toUpperCase()}
                </div>
                <span>{locale === 'en' ? 'English' : 'हिन्दी'}</span>
              </div>
              {currentLocale === locale && (
                <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
              )}
            </button>
          ))}
          <div className="mt-2 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 p-3 text-center">
            <p className="text-[10px] font-bold text-white/90 uppercase tracking-[0.1em]">
              Bahujan Kranti Party
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
