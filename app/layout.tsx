import './globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import WebsiteLoader from '@/components/WebsiteLoader';
import { ThemeProvider } from '@/components/theme-provider';
import { SITE_URL } from '@/lib/site';
import { SITE_NAME_FULL } from '@/lib/seo';

const interClassName = 'antialiased font-sans';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME_FULL.en,
    template: `%s | Bahujan Kranti Party`,
  },
  description:
    'Bahujan Kranti Party (Marxwaad-Ambedkarwaad) - A political movement committed to Marxist and Ambedkarite principles, dedicated to social equality, workers\' rights, and empowering every citizen for a progressive, inclusive, and prosperous India.',
  authors: [{ name: SITE_NAME_FULL.en }],
  openGraph: {
    type: 'website',
    siteName: 'Bahujan Kranti Party',
    images: [
      {
        url: '/flag.png',
        width: 1200,
        height: 630,
        alt: 'Bahujan Kranti Party',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const locale = headersList.get('x-locale') || 'en';

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={interClassName}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <WebsiteLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
