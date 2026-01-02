'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const locale = pathname.split('/')[1] || 'en';

  const navigation = [
    { name: 'Home', name_hi: 'होम', href: `/${locale}/` },
    { name: 'About', name_hi: 'परिचय', href: `/${locale}/about` },
    { name: 'Leadership', name_hi: 'नेतृत्व', href: `/${locale}/leadership` },
    { name: 'Manifesto', name_hi: 'घोषणापत्र', href: `/${locale}/manifesto` },
    { name: 'Inspiration', name_hi: 'हमारे प्रेरणा-स्रोत', href: `/${locale}/inspiration` },
    { name: 'News', name_hi: 'समाचार', href: `/${locale}/news` },
    { name: 'Events', name_hi: 'कार्यक्रम', href: `/${locale}/events` },
    { name: 'Contact', name_hi: 'संपर्क', href: `/${locale}/contact` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href={`/${locale}/`} className="flex items-center space-x-2">
            <Image
              src={locale === 'hi' ? '/hindi.png' : '/eng.png'}
              alt="Bahujan Kranti Party Logo"
              width={250}
              height={85}
              className="h-auto"
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">{locale === 'hi' ? 'मेनू खोलें' : 'Toggle menu'}</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-red-600 transition-colors"
            >
              {locale === 'hi' ? item.name_hi : item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 lg:items-center">
          <LanguageSwitcher />
          <Link href={`/${locale}/join`}>
            <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700">
              {locale === 'hi' ? 'हमसे जुड़ें' : 'Join Us'}
            </Button>
          </Link>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-red-50 hover:text-red-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {locale === 'hi' ? item.name_hi : item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
            <Link href={`/${locale}/join`} onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-2 bg-gradient-to-r from-red-600 to-blue-600">
                {locale === 'hi' ? 'हमसे जुड़ें' : 'Join Us'}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
