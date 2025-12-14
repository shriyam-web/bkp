export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bahujan Kranti Party',
    description: 'A political movement dedicated to creating positive change and empowering every citizen for a progressive, inclusive, and prosperous India.',
    url: 'https://bharatparty.in',
    logo: 'https://bharatparty.in/logo.png',
    sameAs: [
      'https://facebook.com/BahujanKrantiParty',
      'https://twitter.com/BahujanKrantiParty',
      'https://instagram.com/BahujanKrantiParty',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@bharatparty.in',
      telephone: '+91-11-1234-5678',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    foundingDate: '2024',
    areaServed: 'India',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Parliament Street',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110001',
      addressCountry: 'IN',
    },
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
      item: `https://bharatparty.in${item.url}`,
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
    url: `https://bharatparty.in${url}`,
    publisher: {
      '@type': 'Organization',
      name: 'Bahujan Kranti Party',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bharatparty.in/logo.png',
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
      name: 'Bahujan Kranti Party',
      url: 'https://bharatparty.in',
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
