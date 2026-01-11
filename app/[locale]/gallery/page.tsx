import { Locale } from '@/i18n.config';
import { TranslationProvider } from '@/lib/TranslationContext';
import GalleryPage from '@/app/gallery-page';
import en from '@/public/locales/en.json';
import hi from '@/public/locales/hi.json';

const translations = {
  en,
  hi,
};

interface Props {
  params: {
    locale: Locale;
  };
}

export default function LocaleGalleryPage({ params }: Props) {
  const locale = params.locale;
  const currentTranslations = translations[locale] || translations.en;

  return (
    <TranslationProvider locale={locale} translations={currentTranslations}>
      <GalleryPage />
    </TranslationProvider>
  );
}
