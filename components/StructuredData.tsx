export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://bahujankrantiparty.org',
    name: 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad)',
    alternateName: ['BKP', 'Bahujan Kranti Party', 'Bahujan Kranti Party Marxwaad-Ambedkarwaad'],
    description: 'Official website of Bahujan Kranti Party (Marxwaad-Ambedkarwaad) - A political movement committed to Marxist and Ambedkarite principles, dedicated to social equality, workers\' rights, and empowering every citizen for a progressive, inclusive, and prosperous India.',
    url: 'https://bahujankrantiparty.org',
    email: 'info@bahujankrantiparty.org',
    logo: 'https://bahujankrantiparty.org/flag.png',
    image: 'https://bahujankrantiparty.org/flag.png',
    sameAs: [
      'https://facebook.com/BahujanKrantiParty',
      'https://twitter.com/BahujanKrantiParty',
      'https://instagram.com/BahujanKrantiParty',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'info@bahujankrantiparty.org',
        telephone: '+91-11-1234-5678',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
    ],
    foundingDate: '2024',
    areaServed: {
      '@type': 'Country',
      name: 'IN',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Parliament Street',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110001',
      addressCountry: 'IN',
    },
    knowsAbout: [
      'Social Equality',
      'Workers\' Rights',
      'Marxist Ideology',
      'Ambedkarite Movement',
      'Social Justice',
      'Caste Eradication',
      'Democratic Participation',
      'Inclusive Development',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://bahujankrantiparty.org${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: `https://bahujankrantiparty.org${url}`,
    publisher: {
      '@type': 'Organization',
      name: 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad)',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bahujankrantiparty.org/flag.png',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: name,
    description: description,
    startDate: startDate,
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
      name: 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad)',
      url: 'https://bahujankrantiparty.org',
    },
    ...(image && {
      image: image,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
