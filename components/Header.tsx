'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Flag, ChevronDown, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ModeToggle } from '@/components/mode-toggle';
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
      "fixed top-0 z-50 w-full bg-background border-b border-border transition-all duration-300"
    )}>
      <nav className={cn(
        "mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
      )}>
        <div className="flex shrink-0 lg:mr-16">
          <Link href={`/${locale}/`} className="flex items-center group">
            <div className="flex flex-col leading-none">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-foreground whitespace-nowrap">
                {locale === 'hi' ? 'बहुजन क्रान्ति पार्टी' : 'Bahujan Kranti Party'}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-red-600 uppercase whitespace-nowrap mt-1">
                {locale === 'hi' ? 'मार्क्सवाद-अम्बेडकरवाद' : 'Marxwaad-Ambedkarwaad'}
              </span>
            </div>
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-3">
          <ModeToggle />
          <LanguageSwitcher isDark={false} />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-accent transition-all"
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

        <div className="hidden lg:flex lg:gap-x-1 items-center">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-2.5 py-2 text-[13px] font-bold tracking-tight uppercase transition-all duration-200",
                  isActive 
                    ? "text-red-600 border-b-2 border-red-600 rounded-none" 
                    : "text-muted-foreground hover:text-red-600"
                )}
              >
                {locale === 'hi' ? item.name_hi : item.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-6 lg:items-center">
          <ModeToggle />
          <LanguageSwitcher isDark={false} />
          <Link href={`/${locale}/join`}>
            <Button className="rounded-md bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest px-6 h-10 shadow-md active:scale-95 transition-all flex items-center gap-2 border-0">
              <Heart className="h-3.5 w-3.5 fill-white" />
              {locale === 'hi' ? 'शामिल हों' : 'Join Us'}
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-50 bg-background transition-all duration-500 ease-in-out transform",
        mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link href={`/${locale}/`} onClick={() => setMobileMenuOpen(false)}>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tight text-foreground whitespace-nowrap">
                  {locale === 'hi' ? 'बहुजन क्रान्ति पार्टी' : 'Bahujan Kranti Party'}
                </span>
                <span className="text-[9px] font-bold tracking-[0.12em] text-red-600 uppercase whitespace-nowrap mt-1">
                  {locale === 'hi' ? 'मार्क्सवाद-अम्बेडकरवाद' : 'Marxwaad-Ambedkarwaad'}
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-accent text-foreground"
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
                    isActive ? "bg-red-50 dark:bg-red-900/20 text-red-600" : "text-foreground hover:bg-accent"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {locale === 'hi' ? item.name_hi : item.name}
                  <ChevronDown className={cn("h-5 w-5 -rotate-90", isActive ? "text-red-600" : "text-muted-foreground")} />
                </Link>
              );
            })}
          </div>

          <div className="p-6 border-t border-border bg-muted/50">
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
