'use client';

import {
  Playfair_Display,
  Noto_Serif_Devanagari,
  Inter,
  Noto_Sans_Devanagari,
} from 'next/font/google';
import { cn } from '@/lib/utils';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});

const notoSerifHi = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

const notoSansHi = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500'],
  display: 'swap',
});

interface BrandLogoProps {
  locale: string;
  className?: string;
  /** Use on dark backgrounds (e.g. mobile menu) */
  inverted?: boolean;
}

export default function BrandLogo({ locale, className, inverted = false }: BrandLogoProps) {
  const isHi = locale === 'hi';

  return (
    <div className={cn('inline-flex min-w-0 flex-col', className)}>
      <span
        className={cn(
          isHi ? notoSerifHi.className : playfair.className,
          'block truncate font-semibold leading-[1.2] tracking-tight',
          isHi ? 'text-[15px] sm:text-[1.2rem]' : 'text-[1.05rem] sm:text-[1.3rem]',
          inverted ? 'text-white' : 'text-foreground'
        )}
      >
        {isHi ? 'बहुजन क्रान्ति पार्टी' : 'Bahujan Kranti Party'}
      </span>

      <span
        className={cn(
          isHi ? notoSansHi.className : inter.className,
          'mt-1 block truncate text-[9px] sm:text-[10px] font-normal leading-none tracking-wide',
          inverted ? 'text-slate-400' : 'text-red-600'
        )}
      >
        {isHi ? 'मार्क्सवाद - अम्बेडकरवाद' : 'Marxwaad - Ambedkarwaad'}
      </span>
    </div>
  );
}
