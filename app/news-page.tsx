'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { useTranslations } from '@/lib/TranslationContext';

interface News {
  _id: string;
  title: string;
  excerpt: string;
  image_url: string;
  published_at: string;
}

export default function NewsPage() {
  const { t, locale } = useTranslations();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/news');
        const result = await response.json();

        if (result.data) setNews(result.data);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden bg-muted/30 pt-32 pb-20 border-b border-border">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-red-500/5 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full bg-red-50 dark:bg-red-950/30 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-red-600 border border-red-100 dark:border-red-900/50 mb-6 uppercase">
              {locale === 'hi' ? 'नवीनतम अपडेट' : 'LATEST UPDATES'}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6 leading-tight">
              {locale === 'hi' ? 'प्रेस विज्ञप्ति' : 'Press Release'} <br />
              <span className="text-muted-foreground font-medium text-3xl sm:text-5xl">
                {locale === 'hi' ? 'ताज़ा घोषणाएं' : 'OFFICIAL ANNOUNCEMENTS'}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl font-normal leading-relaxed border-l-2 border-red-600/40 pl-6">
              {locale === 'hi'
                ? 'हमारी आधिकारिक घोषणाओं और महत्वपूर्ण समाचारों के बारे में अवगत रहें'
                : 'Stay informed about our official announcements and important updates'
              }
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
              <p className="mt-4 text-muted-foreground">{locale === 'hi' ? 'प्रेस विज्ञप्ति लोड हो रही है...' : 'Loading press releases...'}</p>
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <NewsCard key={item._id} id={item._id} {...item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {locale === 'hi'
                  ? 'इस समय कोई प्रेस विज्ञप्ति उपलब्ध नहीं है। जल्द ही वापस जांचें!'
                  : 'No press releases available at the moment. Check back soon!'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
