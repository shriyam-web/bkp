import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bahujan Kranti Party (Marxwaad-Ambedkarwaad)',
    short_name: 'BKP',
    description:
      'Official website of Bahujan Kranti Party — social equality, workers\' rights, and inclusive development.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#b91c1c',
    lang: 'en',
    icons: [
      {
        src: '/flag.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['politics', 'news', 'social'],
  };
}
