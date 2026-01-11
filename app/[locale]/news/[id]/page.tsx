import { Locale } from '@/i18n.config';
import { TranslationProvider } from '@/lib/TranslationContext';
import NewsDetailPage from '@/app/news-detail-page';
import en from '@/public/locales/en.json';
import hi from '@/public/locales/hi.json';

const translations = {
  en,
  hi,
};

interface Props {
  params: {
    locale: Locale;
    id: string;
  };
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
