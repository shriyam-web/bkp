'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, ArrowLeft, Loader2 } from 'lucide-react';
import { useTranslations } from '@/lib/TranslationContext';
import { formatDate } from '@/lib/utils';

interface News {
  _id: string;
  title: string;
  excerpt: string;
  image_url: string;
  published_at: string;
}

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { locale } = useTranslations();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const id = params.id as string;

  useEffect(() => {
    if (!id) return;

    async function fetchNews() {
      try {
        const response = await fetch(`/api/news`);
        const result = await response.json();

        if (result.data && Array.isArray(result.data)) {
          const foundNews = result.data.find((item: any) => item._id === id);
          if (foundNews) {
            setNews(foundNews);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [id]);

  const formattedDate = news ? formatDate(news.published_at, true) : '';

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-8 bg-gray-50 border-b">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to News
          </button>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : error || !news ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">News article not found.</p>
            </div>
          ) : (
            <article className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{news.title}</h1>

              <div className="flex items-center gap-2 text-gray-600 mb-8">
                <Calendar className="h-5 w-5" />
                <time dateTime={news.published_at}>{formattedDate}</time>
              </div>

              {news.image_url && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img
                    src={news.image_url}
                    alt={news.title}
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {news.excerpt}
                </p>
              </div>

              <div className="mt-12 pt-8 border-t">
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back to News
                </button>
              </div>
            </article>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
