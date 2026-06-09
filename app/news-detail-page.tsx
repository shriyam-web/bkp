'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShareButtons from '@/components/ShareButtons';
import MediaDisplay from '@/components/MediaDisplay';
import { Calendar, ArrowLeft, Loader2 } from 'lucide-react';
import { useTranslations } from '@/lib/TranslationContext';
import { formatDate } from '@/lib/utils';
import { MediaType, MediaAttachment } from '@/lib/media';
import { absoluteUrl } from '@/lib/site';

interface News {
  _id: string;
  title: string;
  excerpt: string;
  content?: string;
  image_url: string;
  media_type?: MediaType;
  attachments?: MediaAttachment[];
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
  const isHi = locale === 'hi';

  useEffect(() => {
    if (!id) return;

    async function fetchNews() {
      try {
        const response = await fetch(`/api/news/${id}`);
        const result = await response.json();
        if (result.success && result.data) {
          setNews(result.data);
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
  const shareUrl = absoluteUrl(`/${locale}/news/${id}`);
  const bodyText = news?.content || news?.excerpt || '';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="h-1 bg-red-600" />

      <section className="pt-24 pb-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push(`/${locale}/news`)}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {isHi ? 'सभी प्रेस विज्ञप्ति' : 'All press releases'}
          </button>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-red-600" />
              <p className="text-sm text-muted-foreground">
                {isHi ? 'लोड हो रहा है...' : 'Loading...'}
              </p>
            </div>
          ) : error || !news ? (
            <div className="text-center py-20">
              <p className="text-foreground font-medium mb-1">
                {isHi ? 'विज्ञप्ति नहीं मिली' : 'Release not found'}
              </p>
              <button
                onClick={() => router.push(`/${locale}/news`)}
                className="mt-4 text-sm text-red-600 hover:underline"
              >
                {isHi ? 'वापस जाएं' : 'Go back'}
              </button>
            </div>
          ) : (
            <article>
              <header className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-red-600 mb-3">
                  {isHi ? 'प्रेस विज्ञप्ति' : 'Press Release'}
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight tracking-tight">
                  {news.title}
                </h1>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
                  <time
                    dateTime={news.published_at}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    {formattedDate}
                  </time>
                  <ShareButtons
                    variant="bar"
                    content={{
                      title: news.title,
                      text: news.excerpt,
                      url: shareUrl,
                    }}
                  />
                </div>
              </header>

              {news.image_url && (
                <figure className="mb-8 -mx-4 sm:mx-0">
                  <div className="rounded-lg overflow-hidden border border-border bg-muted">
                    <MediaDisplay
                      url={news.image_url}
                      type={news.media_type || 'image'}
                      alt={news.title}
                      className={`w-full object-cover ${
                        news.media_type === 'banner' ? 'max-h-[280px]' : 'max-h-[420px]'
                      }`}
                      controls={news.media_type === 'video'}
                    />
                  </div>
                </figure>
              )}

              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {news.content && news.excerpt && news.content !== news.excerpt && (
                  <p className="text-lg font-medium text-foreground leading-relaxed mb-6 not-prose">
                    {news.excerpt}
                  </p>
                )}
                <div className="text-base text-foreground/90 leading-[1.8] whitespace-pre-wrap">
                  {bodyText}
                </div>
              </div>

              {news.attachments && news.attachments.length > 0 && (
                <section className="mt-12 pt-8 border-t border-border">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-5">
                    {isHi ? 'संबंधित मीडिया' : 'Related Media'}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {news.attachments.map((att, i) => (
                      <figure
                        key={i}
                        className="rounded-lg overflow-hidden border border-border bg-muted"
                      >
                        <MediaDisplay
                          url={att.url}
                          type={att.type}
                          alt={att.title || news.title}
                          className="w-full aspect-video object-cover"
                          controls={att.type === 'video'}
                          showPlayIcon={att.type === 'video'}
                        />
                        {att.title && (
                          <figcaption className="px-3 py-2 text-xs text-muted-foreground border-t border-border bg-background">
                            {att.title}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </section>
              )}

              <footer className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <button
                  onClick={() => router.push(`/${locale}/news`)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {isHi ? 'सभी प्रेस विज्ञप्ति' : 'All press releases'}
                </button>
                <ShareButtons
                  variant="bar"
                  content={{
                    title: news.title,
                    text: news.excerpt,
                    url: shareUrl,
                  }}
                />
              </footer>
            </article>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
