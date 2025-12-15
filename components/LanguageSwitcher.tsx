'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { i18n, type Locale } from '@/i18n.config';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = (pathname.split('/')[1] || i18n.defaultLocale) as Locale;

  const switchLanguage = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale || '/'}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 transition-colors text-gray-900 font-medium"
        title="Switch Language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm uppercase">
          {currentLocale === 'en' ? 'EN' : 'HI'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
          {i18n.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLanguage(locale)}
              className={`w-full text-left px-4 py-3 transition-colors ${
                currentLocale === locale
                  ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white font-semibold'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {locale === 'en' ? 'English' : 'हिन्दी'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
