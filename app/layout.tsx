import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://bahujankrantiparty.org/'),
  title: 'Bahujan Kranti Party | Building a Better India',
  description: 'Bahujan Kranti Party - A movement dedicated to creating positive change and empowering every citizen for a progressive, inclusive, and prosperous India.',
  keywords: 'Bahujan Kranti Party, political party, India, social change, inclusive development, democracy, citizen empowerment',
  authors: [{ name: 'Bahujan Kranti Party' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://bahujankrantiparty.org/',
    siteName: 'Bahujan Kranti Party',
    title: 'Bahujan Kranti Party | Building a Better India',
    description: 'Join our movement for positive change and inclusive development across India.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bahujan Kranti Party',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@BahujanKrantiParty',
    creator: '@BahujanKrantiParty',
    images: ['/og-image.png'],
    title: 'Bahujan Kranti Party | Building a Better India',
    description: 'Join our movement for positive change and inclusive development across India.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
