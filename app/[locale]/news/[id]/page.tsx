import { Metadata } from 'next';
import { Locale } from '@/i18n.config';
import { TranslationProvider } from '@/lib/TranslationContext';
import NewsDetailPage from '@/app/news-detail-page';
import { absoluteUrl } from '@/lib/site';
import en from '@/public/locales/en.json';
import hi from '@/public/locales/hi.json';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';

const translations = { en, hi };

interface Props {
  params: {
    locale: Locale;
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    await dbConnect();
    const article = await News.findById(params.id).lean();

    if (!article) {
      return {
        title: 'Press Release Not Found',
      };
    }

    const url = absoluteUrl(`/${params.locale}/news/${params.id}`);
    const description = article.excerpt || article.content?.slice(0, 160) || '';

    return {
      title: article.title,
      description,
      openGraph: {
        title: article.title,
        description,
        url,
        type: 'article',
        publishedTime: article.published_at?.toISOString?.() || String(article.published_at),
        images: article.image_url
          ? [{ url: article.image_url, alt: article.title }]
          : [],
      },
      twitter: {
        card: article.image_url ? 'summary_large_image' : 'summary',
        title: article.title,
        description,
        images: article.image_url ? [article.image_url] : [],
      },
    };
  } catch {
    return { title: 'Press Release' };
  }
}

export default function LocaleNewsDetailPage({ params }: Props) {
  const locale = params.locale;
  const currentTranslations = translations[locale] || translations.en;

  return (
    <TranslationProvider locale={locale} translations={currentTranslations}>
      <NewsDetailPage />
    </TranslationProvider>
  );
}
