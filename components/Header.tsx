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

      {/* Full-screen mobile menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-[100] transition-all duration-300 ease-out',
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        )}
        aria-hidden={!menuOpen}
      >
        <div
          className={cn(
            'absolute inset-0 flex flex-col bg-[#0f172a] text-white transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
            menuOpen ? 'translate-y-0' : 'translate-y-full'
          )}
        >
          <div className="h-1 bg-red-600 shrink-0" />

          {/* Menu header */}
          <div className="flex items-start justify-between px-5 pt-5 pb-4 shrink-0">
            <BrandLogo locale={locale} inverted />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label={isHi ? 'बंद करें' : 'Close menu'}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable links */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
            {navGroups.map((group) => (
              <div key={group.id} className="mb-6 last:mb-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">
                  {isHi ? group.label_hi : group.label}
                </p>
                <ul className="space-y-2">
                  {group.items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.key}>
                        <Link
                          href={hrefFor(item.href)}
                          onClick={() => setMenuOpen(false)}
                          className={cn(
                            'group flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all active:scale-[0.98]',
                            active
                              ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                              : 'bg-white/5 hover:bg-white/10 text-white'
                          )}
                        >
                          <span
                            className={cn(
                              'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors',
                              active ? 'bg-white/20' : 'bg-red-600/20 text-red-400 group-hover:bg-red-600/30'
                            )}
                          >
                            <item.icon className="h-5 w-5" />
                          </span>
                          <span className="flex-1 text-base font-semibold">{label(item)}</span>
                          <ArrowRight
                            className={cn(
                              'h-4 w-4 shrink-0 transition-transform',
                              active ? 'opacity-100' : 'opacity-40 group-hover:translate-x-0.5 group-hover:opacity-70'
                            )}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Menu footer */}
          <div className="shrink-0 border-t border-white/10 bg-[#0a0f1a] px-5 py-4 space-y-3 safe-area-pb">
            <div className="flex items-center gap-2">
              <LanguageSwitcher variant="pill" />
              <div className="flex-1" />
              <ModeToggle />
            </div>
            <Link href={hrefFor('/join')} onClick={() => setMenuOpen(false)}>
              <Button className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-base shadow-xl shadow-red-900/40 gap-2">
                <Heart className="h-4 w-4 fill-white" />
                {isHi ? 'आंदोलन में शामिल हों' : 'Join the Movement'}
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
