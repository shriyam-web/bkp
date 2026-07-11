import { Playfair_Display, Source_Sans_3 } from 'next/font/google';

/** Shared admin fonts — single module avoids HMR CSS link thrashing. */
export const adminDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-admin-display',
});

export const adminSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-admin-sans',
});
