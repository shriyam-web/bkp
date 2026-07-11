import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n.config';
import { SITE_URL, absoluteUrl } from '@/lib/site';

export const SITE_NAME = {
  en: 'Bahujan Kranti Party',
  hi: 'बहुजन क्रान्ति पार्टी',
} as const;

export const SITE_NAME_FULL = {
  en: 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad)',
  hi: 'बहुजन क्रान्ति पार्टी (मार्क्सवाद-अम्बेडकरवाद)',
} as const;

type PageSeo = {
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  path: string;
  priority?: number;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
};

/** Static public routes used for sitemap + page metadata */
export const PAGE_SEO: Record<string, PageSeo> = {
  home: {
    path: '',
    priority: 1,
    changeFrequency: 'weekly',
    title: {
      en: 'Official Website | Social Equality & Workers\' Rights',
      hi: 'आधिकारिक वेबसाइट | सामाजिक समानता और श्रमिक अधिकार',
    },
    description: {
      en: 'Official website of Bahujan Kranti Party (Marxwaad-Ambedkarwaad). Join the movement for social equality, workers\' rights, Ambedkarite and Marxist values, and inclusive development across India.',
      hi: 'बहुजन क्रान्ति पार्टी (मार्क्सवाद-अम्बेडकरवाद) की आधिकारिक वेबसाइट। सामाजिक समानता, श्रमिक अधिकार, अंबेडकरवादी और मार्क्सवादी मूल्यों तथा समावेशी विकास के आंदोलन से जुड़ें।',
    },
  },
  about: {
    path: '/about',
    priority: 0.9,
    changeFrequency: 'monthly',
    title: {
      en: 'About Us',
      hi: 'हमारे बारे में',
    },
    description: {
      en: 'Learn about Bahujan Kranti Party — our history, ideology of Marxwaad-Ambedkarwaad, mission for social justice, and vision for an equal India.',
      hi: 'बहुजन क्रान्ति पार्टी के बारे में जानें — हमारा इतिहास, मार्क्सवाद-अम्बेडकरवाद की विचारधारा, सामाजिक न्याय का मिशन और समान भारत की दृष्टि।',
    },
  },
  leadership: {
    path: '/leadership',
    priority: 0.9,
    changeFrequency: 'weekly',
    title: {
      en: 'Leadership',
      hi: 'नेतृत्व',
    },
    description: {
      en: 'Meet the national and state leadership of Bahujan Kranti Party. View official profiles and identity information of party leaders.',
      hi: 'बहुजन क्रान्ति पार्टी के राष्ट्रीय और राज्य नेतृत्व से मिलें। पार्टी नेताओं की आधिकारिक प्रोफ़ाइल और पहचान जानकारी देखें।',
    },
  },
  manifesto: {
    path: '/manifesto',
    priority: 0.9,
    changeFrequency: 'monthly',
    title: {
      en: 'Manifesto',
      hi: 'घोषणापत्र',
    },
    description: {
      en: 'Read the Bahujan Kranti Party manifesto — our pledges on equality, labour rights, education, social justice, and democratic governance.',
      hi: 'बहुजन क्रान्ति पार्टी का घोषणापत्र पढ़ें — समानता, श्रम अधिकार, शिक्षा, सामाजिक न्याय और लोकतांत्रिक शासन पर हमारी प्रतिबद्धताएँ।',
    },
  },
  news: {
    path: '/news',
    priority: 0.85,
    changeFrequency: 'daily',
    title: {
      en: 'News & Press Releases',
      hi: 'समाचार और प्रेस विज्ञप्ति',
    },
    description: {
      en: 'Latest news, statements, and press releases from Bahujan Kranti Party on politics, social justice, and organisational updates.',
      hi: 'बहुजन क्रान्ति पार्टी की नवीनतम खबरें, बयान और प्रेस विज्ञप्तियाँ — राजनीति, सामाजिक न्याय और संगठनात्मक अपडेट।',
    },
  },
  events: {
    path: '/events',
    priority: 0.8,
    changeFrequency: 'weekly',
    title: {
      en: 'Events',
      hi: 'कार्यक्रम',
    },
    description: {
      en: 'Upcoming and past events, rallies, and programmes organised by Bahujan Kranti Party across India.',
      hi: 'भारत भर में बहुजन क्रान्ति पार्टी द्वारा आयोजित आगामी और पिछले कार्यक्रम, रैलियाँ और आयोजन।',
    },
  },
  join: {
    path: '/join',
    priority: 0.9,
    changeFrequency: 'monthly',
    title: {
      en: 'Join Us | Become a Member',
      hi: 'हमसे जुड़ें | सदस्य बनें',
    },
    description: {
      en: 'Join Bahujan Kranti Party as a member. Register online, take the pledge, and contribute to the struggle for equality and justice.',
      hi: 'बहुजन क्रान्ति पार्टी के सदस्य बनें। ऑनलाइन पंजीकरण करें, घोषणा लें, और समानता व न्याय के संघर्ष में योगदान दें।',
    },
  },
  contact: {
    path: '/contact',
    priority: 0.75,
    changeFrequency: 'monthly',
    title: {
      en: 'Contact Us',
      hi: 'संपर्क करें',
    },
    description: {
      en: 'Contact Bahujan Kranti Party — address in Farrukhabad, Uttar Pradesh, phone +91 7376264269, and email bahujankrantipartyma@gmail.com.',
      hi: 'बहुजन क्रान्ति पार्टी से संपर्क करें — फर्रुखाबाद, उत्तर प्रदेश का पता, फोन +91 7376264269, और ईमेल bahujankrantipartyma@gmail.com।',
    },
  },
  gallery: {
    path: '/gallery',
    priority: 0.7,
    changeFrequency: 'weekly',
    title: {
      en: 'Gallery',
      hi: 'गैलरी',
    },
    description: {
      en: 'Photo gallery of Bahujan Kranti Party programmes, leadership events, and organisational activities.',
      hi: 'बहुजन क्रान्ति पार्टी के कार्यक्रमों, नेतृत्व आयोजनों और संगठनात्मक गतिविधियों की फोटो गैलरी।',
    },
  },
  organization: {
    path: '/organization',
    priority: 0.8,
    changeFrequency: 'monthly',
    title: {
      en: 'Organisation Structure',
      hi: 'संगठन संरचना',
    },
    description: {
      en: 'Explore the organisational structure of Bahujan Kranti Party — national, state, district, and booth-level committees.',
      hi: 'बहुजन क्रान्ति पार्टी की संगठनात्मक संरचना देखें — राष्ट्रीय, राज्य, जिला और बूथ स्तर की समितियाँ।',
    },
  },
  'booth-committee': {
    path: '/booth-committee',
    priority: 0.85,
    changeFrequency: 'weekly',
    title: {
      en: 'Booth Level Committee',
      hi: 'बूथ स्तर समिति',
    },
    description: {
      en: 'Find booth-level committee members of Bahujan Kranti Party by state, assembly, and booth. View profiles and download identity cards.',
      hi: 'राज्य, विधानसभा और बूथ के अनुसार बहुजन क्रान्ति पार्टी की बूथ स्तर समिति के सदस्य खोजें। प्रोफ़ाइल देखें और पहचान पत्र डाउनलोड करें।',
    },
  },
  inspiration: {
    path: '/inspiration',
    priority: 0.7,
    changeFrequency: 'monthly',
    title: {
      en: 'Inspiration',
      hi: 'प्रेरणा',
    },
    description: {
      en: 'Ideological inspiration of Bahujan Kranti Party — Dr. B.R. Ambedkar, Karl Marx, and the path of social transformation.',
      hi: 'बहुजन क्रान्ति पार्टी की वैचारिक प्रेरणा — डॉ. बी.आर. अम्बेडकर, कार्ल मार्क्स, और सामाजिक परिवर्तन का मार्ग।',
    },
  },
  privacy: {
    path: '/privacy',
    priority: 0.4,
    changeFrequency: 'yearly',
    title: {
      en: 'Privacy Policy',
      hi: 'गोपनीयता नीति',
    },
    description: {
      en: 'Privacy Policy of Bahujan Kranti Party website — how we collect, use, and protect your personal information.',
      hi: 'बहुजन क्रान्ति पार्टी वेबसाइट की गोपनीयता नीति — हम आपकी व्यक्तिगत जानकारी कैसे एकत्र, उपयोग और सुरक्षित रखते हैं।',
    },
  },
  terms: {
    path: '/terms',
    priority: 0.4,
    changeFrequency: 'yearly',
    title: {
      en: 'Terms of Service',
      hi: 'सेवा की शर्तें',
    },
    description: {
      en: 'Terms of Service for using the official Bahujan Kranti Party website, membership forms, and organisational tools.',
      hi: 'बहुजन क्रान्ति पार्टी की आधिकारिक वेबसाइट, सदस्यता फॉर्म और संगठनात्मक उपकरणों के उपयोग की सेवा शर्तें।',
    },
  },
};

export function localePath(locale: Locale, path = ''): string {
  const normalized = path === '/' ? '' : path;
  return `/${locale}${normalized}`;
}

export function languageAlternates(path = '') {
  const languages: Record<string, string> = {};
  for (const locale of i18n.locales) {
    languages[locale] = absoluteUrl(localePath(locale, path));
  }
  languages['x-default'] = absoluteUrl(localePath(i18n.defaultLocale, path));
  return languages;
}

export function buildPageMetadata(
  locale: Locale,
  pageKey: keyof typeof PAGE_SEO
): Metadata {
  const page = PAGE_SEO[pageKey];
  const isHi = locale === 'hi';
  const title = page.title[locale];
  const description = page.description[locale];
  const url = absoluteUrl(localePath(locale, page.path));
  const siteName = SITE_NAME[locale];

  return {
    title,
    description,
    applicationName: SITE_NAME_FULL[locale],
    authors: [{ name: SITE_NAME_FULL.en }],
    creator: SITE_NAME_FULL.en,
    publisher: SITE_NAME_FULL.en,
    category: 'Politics',
    keywords: isHi
      ? [
          'बहुजन क्रान्ति पार्टी',
          'मार्क्सवाद अम्बेडकरवाद',
          'सामाजिक समानता',
          'श्रमिक अधिकार',
          'अम्बेडकरवादी',
          'राजनीतिक पार्टी भारत',
        ]
      : [
          'Bahujan Kranti Party',
          'Marxwaad Ambedkarwaad',
          'social equality',
          'workers rights',
          'Ambedkarite',
          'political party India',
        ],
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
      canonical: url,
      languages: languageAlternates(page.path),
    },
    openGraph: {
      type: 'website',
      locale: isHi ? 'hi_IN' : 'en_IN',
      url,
      siteName,
      title: `${title} | ${siteName}`,
      description,
      images: [
        {
          url: absoluteUrl('/flag.png'),
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
      title: `${title} | ${siteName}`,
      description,
      images: [absoluteUrl('/flag.png')],
    },
    metadataBase: new URL(SITE_URL),
  };
}

export function createLocalePageMetadata(pageKey: keyof typeof PAGE_SEO) {
  return async function generateMetadata({
    params,
  }: {
    params: { locale: Locale };
  }): Promise<Metadata> {
    const meta = buildPageMetadata(params.locale, pageKey);
    if (pageKey === 'home') {
      const page = PAGE_SEO.home;
      const title = page.title[params.locale];
      return {
        ...meta,
        title: {
          absolute: `${SITE_NAME_FULL[params.locale]} | ${title}`,
        },
      };
    }
    return meta;
  };
}

export function buildArticleMetadata({
  locale,
  path,
  title,
  description,
  image,
  publishedTime,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string | null;
  publishedTime?: string;
}): Metadata {
  const url = absoluteUrl(localePath(locale, path));
  const siteName = SITE_NAME[locale];
  const ogImage = image || absoluteUrl('/flag.png');

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: 'article',
      locale: locale === 'hi' ? 'hi_IN' : 'en_IN',
      url,
      siteName,
      title,
      description,
      publishedTime,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
