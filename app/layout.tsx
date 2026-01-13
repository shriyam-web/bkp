import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import WebsiteLoader from '@/components/WebsiteLoader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://bahujankrantiparty.org/'),
  title: 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad) | Official Website',
  description: 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad) - A political movement committed to Marxist and Ambedkarite principles, dedicated to social equality, workers\' rights, and empowering every citizen for a progressive, inclusive, and prosperous India.',
  keywords: 'Bahujan Kranti Party, Marxwaad-Ambedkarwaad, political party India, social equality, workers\' rights, Ambedkarite movement, Marxist ideology, inclusive development, democracy, citizen empowerment, social justice, caste eradication',
  authors: [{ name: 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad)' }],
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://bahujankrantiparty.org',
    siteName: 'Bahujan Kranti Party',
    title: 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad)',
    description: 'Official website of Bahujan Kranti Party - A movement for social equality and inclusive development',
    images: [
      {
        url: 'https://bahujankrantiparty.org/flag.png',
        width: 1200,
        height: 630,
        alt: 'Bahujan Kranti Party',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad)',
    description: 'Official website of Bahujan Kranti Party - A movement for social equality and inclusive development',
    images: ['https://bahujankrantiparty.org/flag.png'],
  },
  alternates: {
    canonical: 'https://bahujankrantiparty.org',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <WebsiteLoader />
        {children}
      </body>
    </html>
  );
}



