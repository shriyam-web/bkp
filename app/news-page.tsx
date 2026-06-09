'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageIntro from '@/components/PageIntro';
import NewsCard from '@/components/NewsCard';
import { useTranslations } from '@/lib/TranslationContext';
import { FileText, Loader2 } from 'lucide-react';

interface News {
  _id: string;
  title: string;
  excerpt: string;
  image_url: string;
  media_type?: 'image' | 'video' | 'banner';
  published_at: string;
}

export default function NewsPage() {
  const { locale } = useTranslations();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  const isHi = locale === 'hi';

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

  const [featured, ...rest] = news;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageIntro
        title={isHi ? 'प्रेस विज्ञप्ति' : 'Press Releases'}
        subtitle={isHi ? 'आधिकारिक घोषणाएं' : 'Official Announcements'}
        description={
          isHi
            ? 'पार्टी की आधिकारिक घोषणाएं, समाचार और महत्वपूर्ण अपडेट।'
            : 'Official party announcements, news, and important updates.'
        }
        count={news.length}
        countLabel={isHi ? 'कुल विज्ञप्ति' : 'releases'}
      />

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-red-600" />
              <p className="text-sm text-muted-foreground">
                {isHi ? 'लोड हो रहा है...' : 'Loading...'}
              </p>
            </div>
          ) : news.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <FileText className="h-10 w-10 text-muted-foreground/40 mb-4" />
              <p className="text-foreground font-medium mb-1">
                {isHi ? 'कोई प्रेस विज्ञप्ति नहीं' : 'No press releases yet'}
              </p>
              <p className="text-sm text-muted-foreground max-w-sm">
                {isHi
                  ? 'नई घोषणाएं यहाँ प्रकाशित की जाएंगी।'
                  : 'New announcements will be published here.'}
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {featured && (
                <div>
                  <NewsCard {...featured} id={featured._id} variant="featured" />
                </div>
              )}

              {rest.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-lg font-semibold text-foreground">
                      {isHi ? 'पिछली विज्ञप्तियां' : 'Previous Releases'}
                    </h2>
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-sm text-muted-foreground tabular-nums">
                      {rest.length}
                    </span>
                  </div>

                  <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {rest.map((item) => (
                      <NewsCard key={item._id} {...item} id={item._id} variant="card" />
                    ))}
                  </div>

                  <div className="md:hidden border border-border rounded-lg overflow-hidden">
                    {rest.map((item) => (
                      <NewsCard key={item._id} {...item} id={item._id} variant="list" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
