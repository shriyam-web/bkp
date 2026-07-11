'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Heart,
  ArrowRight,
  ChevronDown,
  Home,
  Info,
  Users,
  Vote,
  Building2,
  ScrollText,
  Newspaper,
  Images,
  Mail,
  X,
  Menu,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BrandLogo from '@/components/BrandLogo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ModeToggle } from '@/components/mode-toggle';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type NavItem = {
  key: string;
  name: string;
  name_hi: string;
  href: string;
  icon: LucideIcon;
};

const navGroups: { id: string; label: string; label_hi: string; items: NavItem[] }[] = [
  {
    id: 'party',
    label: 'The Party',
    label_hi: 'पार्टी',
    items: [
      { key: 'home', name: 'Home', name_hi: 'होम', href: '', icon: Home },
      { key: 'about', name: 'About', name_hi: 'परिचय', href: '/about', icon: Info },
      { key: 'leadership', name: 'Leadership', name_hi: 'नेतृत्व', href: '/leadership', icon: Users },
      { key: 'organization', name: 'Organization', name_hi: 'संगठन', href: '/organization', icon: Building2 },
      { key: 'manifesto', name: 'Manifesto', name_hi: 'घोषणापत्र', href: '/manifesto', icon: ScrollText },
    ],
  },
  {
    id: 'movement',
    label: 'Grassroots',
    label_hi: 'जमीनी स्तर',
    items: [
      { key: 'booth', name: 'Booth Committee', name_hi: 'बूथ समिति', href: '/booth-committee', icon: Vote },
    ],
  },
  {
    id: 'media',
    label: 'News & Media',
    label_hi: 'समाचार',
    items: [
      { key: 'news', name: 'Press Release', name_hi: 'प्रेस विज्ञप्ति', href: '/news', icon: Newspaper },
      { key: 'gallery', name: 'Gallery', name_hi: 'गैलरी', href: '/gallery', icon: Images },
    ],
  },
  {
    id: 'connect',
    label: 'Connect',
    label_hi: 'संपर्क',
    items: [
      { key: 'contact', name: 'Contact', name_hi: 'संपर्क', href: '/contact', icon: Mail },
    ],
  },
];

const desktopPrimary = ['home', 'about', 'leadership', 'manifesto'];
const desktopMore = ['organization', 'booth', 'news', 'gallery', 'contact'];

const allItems = navGroups.flatMap((g) => g.items);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const isHi = locale === 'hi';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close overlay when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const hrefFor = (path: string) => `/${locale}${path}`;

  const isActive = (href: string) => {
    const target = href === '' ? `/${locale}` : `/${locale}${href}`;
    if (href === '') {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  const label = (item: NavItem) => (isHi ? item.name_hi : item.name);

  const primaryItems = allItems.filter((i) => desktopPrimary.includes(i.key));
  const moreItems = allItems.filter((i) => desktopMore.includes(i.key));

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-300',
          scrolled
            ? 'bg-background/95 backdrop-blur-lg shadow-md border-b border-border/80'
            : 'bg-background/90 backdrop-blur-sm border-b border-border'
        )}
      >
        <div className="h-1 bg-red-600" />

        <nav className="mx-auto flex h-14 sm:h-[4.25rem] max-w-7xl items-center gap-4 px-4 lg:px-8">
          <Link href={hrefFor('')} className="min-w-0 shrink transition-opacity hover:opacity-85">
            <BrandLogo locale={locale} />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-1">
            {primaryItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={hrefFor(item.href)}
                  className={cn(
                    'px-3 py-2 text-sm font-semibold rounded-md transition-colors',
                    active
                      ? 'text-red-600 bg-red-600/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  )}
                >
                  {label(item)}
                </Link>
              );
            })}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors',
                    moreItems.some((i) => isActive(i.href))
                      ? 'text-red-600 bg-red-600/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  )}
                >
                  {isHi ? 'और' : 'More'}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-52">
                {moreItems.map((item) => (
                  <DropdownMenuItem key={item.key} asChild>
                    <Link
                      href={hrefFor(item.href)}
                      className={cn(
                        'flex items-center gap-2 cursor-pointer',
                        isActive(item.href) && 'text-red-600 font-semibold'
                      )}
                    >
                      <item.icon className="h-4 w-4 opacity-60" />
                      {label(item)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <ModeToggle />
            <LanguageSwitcher />
            <Link href={hrefFor('/join')}>
              <Button className="h-9 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 gap-1.5 shadow-sm">
                <Heart className="h-3.5 w-3.5 fill-white" />
                {isHi ? 'शामिल हों' : 'Join Us'}
              </Button>
            </Link>
          </div>

          {/* Mobile / tablet toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={isHi ? 'मेनू खोलें' : 'Open menu'}
            className="lg:hidden ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 active:scale-95 transition-all"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile menu — 2-col grid fits one screen; no clip, no forced scroll */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-[100]',
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label={isHi ? 'मेनू बंद करें' : 'Close menu'}
          onClick={() => setMenuOpen(false)}
          className={cn(
            'absolute inset-0 bg-black/50 transition-opacity duration-200',
            menuOpen ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* Panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isHi ? 'नेविगेशन मेनू' : 'Navigation menu'}
          className={cn(
            'absolute inset-x-0 top-0 flex max-h-[100dvh] flex-col bg-[#0f172a] text-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'min-h-[min(100dvh,100%)] h-[100dvh]',
            menuOpen ? 'translate-y-0' : '-translate-y-full'
          )}
        >
          <div className="h-0.5 shrink-0 bg-red-600" />

          <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold leading-tight tracking-tight text-white">
                {isHi ? 'बहुजन क्रान्ति पार्टी' : 'Bahujan Kranti Party'}
              </p>
              <p className="mt-0.5 truncate text-[10px] leading-none tracking-wide text-red-400">
                {isHi ? 'मार्क्सवाद - अम्बेडकरवाद' : 'Marxwaad - Ambedkarwaad'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label={isHi ? 'बंद करें' : 'Close'}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/15"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="min-h-0 flex-1 px-3 pb-2">
            <ul className="grid grid-cols-2 gap-1.5">
              {allItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.key} className={item.key === 'booth' ? 'col-span-2' : undefined}>
                    <Link
                      href={hrefFor(item.href)}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-2 rounded-lg px-2.5 py-2.5 transition-colors',
                        active
                          ? 'bg-red-600 text-white'
                          : 'bg-white/[0.06] text-white/95 hover:bg-white/10'
                      )}
                    >
                      <item.icon
                        className={cn(
                          'h-4 w-4 shrink-0',
                          active ? 'text-white' : 'text-red-400'
                        )}
                      />
                      <span className="truncate text-[12.5px] font-semibold leading-snug">
                        {label(item)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="shrink-0 space-y-2 border-t border-white/10 bg-[#0a0f1a] px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between gap-2">
              <LanguageSwitcher variant="pill" />
              <ModeToggle inverted />
            </div>
            <Link
              href={hrefFor('/join')}
              onClick={() => setMenuOpen(false)}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-red-600 text-sm font-semibold text-white hover:bg-red-500"
            >
              <Heart className="h-3.5 w-3.5 fill-white" />
              {isHi ? 'आंदोलन में शामिल हों' : 'Join the Movement'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
