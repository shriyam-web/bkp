import '../globals.css';
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
    metadataBase: new URL('https://bahujankrantiparty.org/'),
    title: isHindi
      ? 'बहुजन क्रांति पार्टी (मार्क्सवाद-अंबेडकरवाद) | एक बेहतर भारत का निर्माण'
      : 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad) | Official Website',
    description: isHindi
      ? 'बहुजन क्रांति पार्टी (मार्क्सवाद-अंबेडकरवाद) - मार्क्सवादी और अंबेडकरवादी सिद्धांतों के लिए समर्पित एक राजनीतिक आंदोलन जो सामाजिक समानता, श्रमिकों के अधिकार और समावेशी विकास के लिए काम करता है।'
      : 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad) - A political movement committed to Marxist and Ambedkarite principles, dedicated to social equality, workers\' rights, and empowering every citizen for a progressive, inclusive, and prosperous India.',
    keywords: isHindi
      ? 'बहुजन क्रांति पार्टी, मार्क्सवाद-अंबेडकरवाद, राजनीतिक पार्टी, भारत, सामाजिक समानता, श्रमिकों के अधिकार, अंबेडकरवादी आंदोलन, मार्क्सवादी विचारधारा, समावेशी विकास, लोकतंत्र, नागरिक सशक्तिकरण, सामाजिक न्याय, जाति निर्मूलन'
      : 'Bahujan Kranti Party, Marxwaad-Ambedkarwaad, political party India, social equality, workers\' rights, Ambedkarite movement, Marxist ideology, inclusive development, democracy, citizen empowerment, social justice, caste eradication',
    authors: [{ name: 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad)' }],
    openGraph: {
      type: 'website',
      locale: isHindi ? 'hi_IN' : 'en_IN',
      url: `https://bahujankrantiparty.org/${locale}`,
      siteName: isHindi ? 'बहुजन क्रांति पार्टी' : 'Bahujan Kranti Party',
      title: isHindi
        ? 'बहुजन क्रांति पार्टी (मार्क्सवाद-अंबेडकरवाद) | एक बेहतर भारत का निर्माण'
        : 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad)',
      description: isHindi
        ? 'हमारे आंदोलन में शामिल हों और सकारात्मक परिवर्तन में अपना योगदान दें। सामाजिक समानता और श्रमिकों के अधिकार के लिए लड़ें।'
        : 'Join our movement for positive change and inclusive development across India. Official Website of Bahujan Kranti Party.',
      images: [
        {
          url: '/flag.png',
          width: 1200,
          height: 630,
          alt: 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad)',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@BahujanKrantiParty',
      creator: '@BahujanKrantiParty',
      images: ['/flag.png'],
      title: isHindi
        ? 'बहुजन क्रांति पार्टी (मार्क्सवाद-अंबेडकरवाद)'
        : 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad)',
      description: isHindi
        ? 'हमारे आंदोलन में शामिल हों और सामाजिक परिवर्तन में भाग लें'
        : 'Join our movement for social equality and worker\'s rights',
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
    alternates: {
      canonical: `https://bahujankrantiparty.org/${locale}`,
    },
  };
}

export default function LocaleLayout({ children, params }: Props) {
  const locale = params.locale;

  return <>{children}</>;
}
