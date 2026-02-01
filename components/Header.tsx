'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Flag, ChevronDown, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const locale = pathname.split('/')[1] || 'en';

  const navigation = [
    { name: 'Home', name_hi: 'होम', href: `/${locale}/` },
    { name: 'About', name_hi: 'परिचय', href: `/${locale}/about` },
    { name: 'Leadership', name_hi: 'नेतृत्व', href: `/${locale}/leadership` },
    { name: 'Organization', name_hi: 'संगठन', href: `/${locale}/organization` },
    { name: 'Manifesto', name_hi: 'घोषणापत्र', href: `/${locale}/manifesto` },
    { name: 'Press Release', name_hi: 'प्रेस विज्ञप्ति', href: `/${locale}/news` },
    { name: 'Gallery', name_hi: 'गैलरी', href: `/${locale}/gallery` },
    { name: 'Contact', name_hi: 'संपर्क', href: `/${locale}/contact` },
  ];

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500",
      scrolled 
        ? "py-2 px-4" 
        : "py-4 px-0"
    )}>
      <nav className={cn(
        "mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-6 transition-all duration-700 ease-in-out",
        scrolled 
          ? "rounded-full bg-white/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/40 ring-1 ring-black/5" 
          : isHome ? "bg-transparent" : "bg-white/40 backdrop-blur-md rounded-2xl mx-4 border border-white/20"
      )}>
        <div className="flex lg:flex-1">
          <Link href={`/${locale}/`} className="flex items-center space-x-2 group">
            <div className={cn(
              "relative overflow-hidden transition-all duration-500 group-hover:scale-110",
              (!scrolled && isHome) && "brightness-0 invert opacity-90"
            )}>
              <Image
                src={locale === 'hi' ? '/hindi.png' : '/eng.png'}
                alt="Logo"
                width={180}
                height={60}
                className="h-8 w-auto object-contain sm:h-10"
              />
            </div>
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-3">
          <LanguageSwitcher isDark={!scrolled && isHome} />
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-full p-2.5 transition-all duration-300",
              scrolled 
                ? "text-gray-900 hover:bg-gray-100 shadow-sm" 
                : "text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">{locale === 'hi' ? 'मेनू खोलें' : 'Toggle menu'}</span>
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-0.5 items-center bg-gray-50/50 p-1 rounded-full backdrop-blur-sm border border-gray-100/50">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-[12px] font-bold tracking-tight uppercase transition-all duration-300 rounded-full",
                  isActive 
                    ? "text-white bg-red-600 shadow-lg shadow-red-600/20" 
                    : (!scrolled && isHome) 
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-gray-600 hover:text-red-600 hover:bg-white shadow-sm border border-transparent hover:border-gray-100"
                )}
              >
                {locale === 'hi' ? item.name_hi : item.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 lg:items-center">
          <div className={cn(
            "h-8 w-[1px] mx-2 transition-colors",
            (!scrolled && isHome) ? "bg-white/20" : "bg-gray-200"
          )} />
          <LanguageSwitcher isDark={!scrolled && isHome} />
          <Link href={`/${locale}/join`}>
            <Button className="rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xs uppercase tracking-widest px-5 h-10 shadow-xl shadow-red-600/20 active:scale-95 transition-all flex items-center gap-2 border-0">
              <Heart className="h-3.5 w-3.5 fill-white" />
              {locale === 'hi' ? 'शामिल हों' : 'Join Us'}
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-50 bg-white transition-all duration-500 ease-in-out transform",
        mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <Link href={`/${locale}/`} onClick={() => setMobileMenuOpen(false)}>
              <Image
                src={locale === 'hi' ? '/hindi.png' : '/eng.png'}
                alt="Logo"
                width={150}
                height={51}
                className="h-8 w-auto"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-gray-100 text-gray-900"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6 px-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-4 rounded-2xl text-lg font-bold transition-all",
                    isActive ? "bg-red-50 text-red-600" : "text-gray-900 hover:bg-gray-50"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {locale === 'hi' ? item.name_hi : item.name}
                  <ChevronDown className={cn("h-5 w-5 -rotate-90", isActive ? "text-red-600" : "text-gray-400")} />
                </Link>
              );
            })}
          </div>

          <div className="p-6 border-t bg-gray-50">
            <Link href={`/${locale}/join`} onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full h-14 rounded-2xl bg-red-600 text-white text-lg font-bold shadow-xl shadow-red-600/20">
                {locale === 'hi' ? 'हमसे जुड़ें' : 'Join Us'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
