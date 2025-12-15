import './../../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Locale, i18n } from '@/i18n.config';
import { getTranslations } from '@/lib/translations';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const locale = params.locale;
  const isHindi = locale === 'hi';

  return {
    metadataBase: new URL('https://bharatparty.in/'),
    title: isHindi
      ? 'बहुजन क्रांति पार्टी | एक बेहतर भारत का निर्माण'
      : 'Bahujan Kranti Party | Building a Better India',
    description: isHindi
      ? 'बहुजन क्रांति पार्टी - एक आंदोलन जो सकारात्मक परिवर्तन लाने के लिए समर्पित है।'
      : 'Bahujan Kranti Party - A movement dedicated to creating positive change and empowering every citizen for a progressive, inclusive, and prosperous India.',
    keywords: isHindi
      ? 'बहुजन क्रांति पार्टी, राजनीतिक पार्टी, भारत, सामाजिक परिवर्तन, समावेशी विकास, लोकतंत्र, नागरिक सशक्तिकरण'
      : 'Bahujan Kranti Party, political party, India, social change, inclusive development, democracy, citizen empowerment',
    authors: [{ name: 'Bahujan Kranti Party' }],
    openGraph: {
      type: 'website',
      locale: isHindi ? 'hi_IN' : 'en_IN',
      url: `https://bharatparty.in/${locale}`,
      siteName: isHindi ? 'बहुजन क्रांति पार्टी' : 'Bahujan Kranti Party',
      title: isHindi
        ? 'बहुजन क्रांति पार्टी | एक बेहतर भारत का निर्माण'
        : 'Bahujan Kranti Party | Building a Better India',
      description: isHindi
        ? 'हमारे आंदोलन में शामिल हों और सकारात्मक परिवर्तन में अपना योगदान दें।'
        : 'Join our movement for positive change and inclusive development across India.',
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
      title: isHindi
        ? 'बहुजन क्रांति पार्टी | एक बेहतर भारत का निर्माण'
        : 'Bahujan Kranti Party | Building a Better India',
      description: isHindi
        ? 'हमारे आंदोलन में शामिल हों'
        : 'Join our movement for positive change',
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
}

export default function LocaleLayout({ children, params }: Props) {
  const locale = params.locale;

  return (
    <html lang={locale} dir={locale === 'hi' ? 'ltr' : 'ltr'}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
