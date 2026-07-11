import { SITE_URL, absoluteUrl } from '@/lib/site';

const ORG = {
  name: 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad)',
  alternateName: ['BKP', 'Bahujan Kranti Party', 'बहुजन क्रान्ति पार्टी'],
  email: 'bahujankrantipartyma@gmail.com',
  phone: '+91-7376264269',
  logo: absoluteUrl('/flag.png'),
  address: {
    streetAddress: '141, Dhansua PO Central Jail Fatehgarh',
    addressLocality: 'Farrukhabad',
    addressRegion: 'Uttar Pradesh',
    postalCode: '209602',
    addressCountry: 'IN',
  },
};

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'PoliticalParty',
        '@id': `${SITE_URL}/#organization`,
        name: ORG.name,
        alternateName: ORG.alternateName,
        description:
          'Official website of Bahujan Kranti Party (Marxwaad-Ambedkarwaad) — a political movement for social equality, workers\' rights, and inclusive development in India.',
        url: SITE_URL,
        email: ORG.email,
        telephone: ORG.phone,
        logo: ORG.logo,
        image: ORG.logo,
        foundingDate: '2024',
        areaServed: { '@type': 'Country', name: 'IN' },
        address: {
          '@type': 'PostalAddress',
          ...ORG.address,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: ORG.email,
          telephone: ORG.phone,
          areaServed: 'IN',
          availableLanguage: ['en', 'hi'],
        },
        sameAs: [
          'https://facebook.com/BahujanKrantiParty',
          'https://twitter.com/BahujanKrantiParty',
          'https://instagram.com/BahujanKrantiParty',
        ],
        knowsAbout: [
          'Social Equality',
          'Workers\' Rights',
          'Ambedkarite Movement',
          'Marxist Ideology',
          'Social Justice',
          'Caste Eradication',
        ],
      }}
    />
  );
}

export function WebsiteSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: ORG.name,
        url: SITE_URL,
        inLanguage: ['en', 'hi'],
        publisher: { '@id': `${SITE_URL}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/en/booth-committee?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url.startsWith('http')
            ? item.url
            : absoluteUrl(item.url),
        })),
      }}
    />
  );
}

export function WebPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url: url.startsWith('http') ? url : absoluteUrl(url),
        isPartOf: { '@id': `${SITE_URL}/#website` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      }}
    />
  );
}

export function NewsArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
}: {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  datePublished?: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: title,
        description,
        url,
        image: image ? [image] : [absoluteUrl('/flag.png')],
        datePublished,
        author: {
          '@type': 'Organization',
          name: ORG.name,
        },
        publisher: {
          '@type': 'Organization',
          name: ORG.name,
          logo: {
            '@type': 'ImageObject',
            url: ORG.logo,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
      }}
    />
  );
}

export function EventSchema({
  name,
  description,
  startDate,
  location,
  image,
}: {
  name: string;
  description: string;
  startDate: string;
  location: string;
  image?: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Event',
        name,
        description,
        startDate,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: location,
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'IN',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: ORG.name,
          url: SITE_URL,
        },
        ...(image ? { image } : {}),
      }}
    />
  );
}
