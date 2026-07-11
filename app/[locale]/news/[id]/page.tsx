import { Metadata } from 'next';
import { Locale } from '@/i18n.config';
import { TranslationProvider } from '@/lib/TranslationContext';
import NewsDetailPage from '@/app/news-detail-page';
import { buildArticleMetadata } from '@/lib/seo';
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

    const description = article.excerpt || article.content?.slice(0, 160) || '';
    const publishedTime =
      article.published_at?.toISOString?.() || String(article.published_at || '');

    return buildArticleMetadata({
      locale: params.locale,
      path: `/news/${params.id}`,
      title: article.title,
      description,
      image: article.image_url,
      publishedTime,
    });
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
