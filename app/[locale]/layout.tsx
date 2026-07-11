import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n.config';
import { SITE_URL } from '@/lib/site';
import { SITE_NAME, SITE_NAME_FULL } from '@/lib/seo';
import {
  OrganizationSchema,
  WebsiteSchema,
} from '@/components/StructuredData';

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
  const isHi = locale === 'hi';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME_FULL[locale],
      template: `%s | ${SITE_NAME[locale]}`,
    },
    description: isHi
      ? 'बहुजन क्रांति पार्टी (मार्क्सवाद-अंबेडकरवाद) - मार्क्सवादी और अंबेडकरवादी सिद्धांतों के लिए समर्पित एक राजनीतिक आंदोलन जो सामाजिक समानता, श्रमिकों के अधिकार और समावेशी विकास के लिए काम करता है।'
      : 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad) - A political movement committed to Marxist and Ambedkarite principles, dedicated to social equality, workers\' rights, and empowering every citizen for a progressive, inclusive, and prosperous India.',
    applicationName: SITE_NAME_FULL[locale],
    authors: [{ name: SITE_NAME_FULL.en }],
    openGraph: {
      type: 'website',
      siteName: SITE_NAME[locale],
      locale: isHi ? 'hi_IN' : 'en_IN',
      images: [
        {
          url: '/flag.png',
          width: 1200,
          height: 630,
          alt: SITE_NAME_FULL[locale],
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@BahujanKrantiParty',
      creator: '@BahujanKrantiParty',
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
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      {children}
    </>
  );
}
