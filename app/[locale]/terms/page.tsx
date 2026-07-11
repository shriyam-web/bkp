import { Locale } from '@/i18n.config';
import { createLocalePageMetadata } from '@/lib/seo';

import { TranslationProvider } from '@/lib/TranslationContext';
import TermsPage from '@/app/terms-page';
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

export default function LocaleTermsPage({ params }: Props) {
  const locale = params.locale;
  const currentTranslations = translations[locale] || translations.en;

  return (
    <TranslationProvider locale={locale} translations={currentTranslations}>
      <TermsPage />
    </TranslationProvider>
  );
}
export const generateMetadata = createLocalePageMetadata('terms');
