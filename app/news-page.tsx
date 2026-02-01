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
    <div className="min-h-screen bg-[#fcfcfc]">
      <Header />

      <section className="relative overflow-hidden bg-[#0a0a0a] pt-48 pb-32">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-xs font-bold tracking-[0.2em] text-red-500 border border-white/10 mb-8 backdrop-blur-md uppercase">
              {locale === 'hi' ? 'नवीनतम अपडेट' : 'LATEST UPDATES'}
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white sm:text-8xl mb-8 leading-[1.1] drop-shadow-2xl">
              {locale === 'hi' ? 'प्रेस विज्ञप्ति' : 'Press Release'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 italic font-serif">
                {locale === 'hi' ? 'ताज़ा घोषणाएं' : 'OFFICIAL ANNOUNCEMENTS'}
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
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
              <p className="mt-4 text-gray-600">{locale === 'hi' ? 'प्रेस विज्ञप्ति लोड हो रही है...' : 'Loading press releases...'}</p>
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <NewsCard key={item._id} id={item._id} {...item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
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
