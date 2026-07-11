'use client';

import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowUpRight,
} from 'lucide-react';
import {
  Playfair_Display,
  Noto_Serif_Devanagari,
  Source_Sans_3,
  Noto_Sans_Devanagari,
} from 'next/font/google';
import { useTranslations } from '@/lib/TranslationContext';
import BrandLogo from '@/components/BrandLogo';
import ScrollToTop from '@/components/ScrollToTop';
import { cn } from '@/lib/utils';

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});

const displayHi = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['600', '700'],
  display: 'swap',
});

const body = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const bodyHi = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const social = [
  { Icon: Facebook, label: 'Facebook', href: '#' },
  { Icon: Twitter, label: 'X', href: '#' },
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Youtube, label: 'YouTube', href: '#' },
];

export default function Footer() {
  const { locale } = useTranslations();
  const isHi = locale === 'hi';
  const year = new Date().getFullYear();
  const type = isHi ? bodyHi.className : body.className;
  const heading = isHi ? displayHi.className : display.className;

  const partyLinks = [
    { href: `/${locale}/about`, label: isHi ? 'हमारे बारे में' : 'About' },
    { href: `/${locale}/leadership`, label: isHi ? 'नेतृत्व' : 'Leadership' },
    { href: `/${locale}/organization`, label: isHi ? 'संगठन' : 'Organisation' },
    { href: `/${locale}/manifesto`, label: isHi ? 'घोषणापत्र' : 'Manifesto' },
  ];

  const actionLinks = [
    { href: `/${locale}/booth-committee`, label: isHi ? 'बूथ समिति' : 'Booth Committee' },
    { href: `/${locale}/news`, label: isHi ? 'प्रेस विज्ञप्ति' : 'Press Release' },
    { href: `/${locale}/gallery`, label: isHi ? 'गैलरी' : 'Gallery' },
    { href: `/${locale}/contact`, label: isHi ? 'संपर्क' : 'Contact' },
  ];

  return (
    <footer className={cn(type, 'relative border-t border-neutral-200 bg-white text-neutral-700')}>
      <ScrollToTop />

      {/* Thin political stripe */}
      <div className="h-1 bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#9a3412]" />

      {/* Membership line */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b91c1c]">
              {isHi ? 'सदस्यता' : 'Membership'}
            </p>
            <p
              className={cn(
                heading,
                'mt-1 text-[1.35rem] leading-snug tracking-tight text-neutral-950 sm:text-[1.5rem]'
              )}
            >
              {isHi
                ? 'आंदोलन का हिस्सा बनें।'
                : 'Stand with the movement.'}
            </p>
          </div>
          <Link
            href={`/${locale}/join`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#b91c1c] px-5 text-sm font-semibold text-white transition hover:bg-[#991b1b]"
          >
            <Heart className="h-4 w-4 fill-white" />
            {isHi ? 'सदस्य बनें' : 'Become a Member'}
            <ArrowUpRight className="h-4 w-4 opacity-80" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-5 space-y-5">
            <BrandLogo locale={locale} />
            <p className="max-w-md text-[15px] leading-relaxed text-neutral-600">
              {isHi
                ? 'सामाजिक समानता, श्रमिक अधिकार और समावेशी विकास के लिए समर्पित आधिकारिक मंच।'
                : 'The official platform for social equality, workers’ rights, and inclusive development across India.'}
            </p>
            <div className="flex gap-2 pt-1">
              {social.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 transition hover:border-[#b91c1c] hover:text-[#b91c1c]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Party */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-950">
              {isHi ? 'पार्टी' : 'The Party'}
            </h3>
            <ul className="space-y-3">
              {partyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-neutral-600 transition hover:text-[#b91c1c]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Engage */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-950">
              {isHi ? 'जुड़ें' : 'Engage'}
            </h3>
            <ul className="space-y-3">
              {actionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-neutral-600 transition hover:text-[#b91c1c]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-950">
              {isHi ? 'कार्यालय' : 'Office'}
            </h3>
            <ul className="space-y-3.5 text-[14px] leading-relaxed text-neutral-600">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#b91c1c]" />
                <span>
                  141, Dhansua PO Central Jail Fatehgarh,
                  <br />
                  Farrukhabad 209602, Uttar Pradesh
                </span>
              </li>
              <li>
                <a
                  href="tel:+917376264269"
                  className="inline-flex items-center gap-2.5 transition hover:text-[#b91c1c]"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#b91c1c]" />
                  +91 7376264269
                </a>
              </li>
              <li>
                <a
                  href="mailto:bahujankrantipartyma@gmail.com"
                  className="inline-flex items-start gap-2.5 break-all transition hover:text-[#b91c1c]"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#b91c1c]" />
                  bahujankrantipartyma@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-[12px] text-neutral-500 sm:text-left">
            &copy; {year}{' '}
            <span className="font-medium text-neutral-800">
              {isHi
                ? 'बहुजन क्रान्ति पार्टी'
                : 'Bahujan Kranti Party'}
            </span>
            {' · '}
            {isHi ? 'मार्क्सवाद-अम्बेडकरवाद' : 'Marxwaad-Ambedkarwaad'}
            {' · '}
            <span className="text-[#b91c1c]">bahujankrantiparty.org</span>
          </p>
          <div className="flex justify-center gap-5 text-[12px] font-medium text-neutral-500">
            <Link href={`/${locale}/privacy`} className="hover:text-[#b91c1c]">
              {isHi ? 'गोपनीयता' : 'Privacy'}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-[#b91c1c]">
              {isHi ? 'शर्तें' : 'Terms'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
