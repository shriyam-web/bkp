import { Locale } from '@/i18n.config';
import { createLocalePageMetadata } from '@/lib/seo';

import { TranslationProvider } from '@/lib/TranslationContext';
import PrivacyPage from '@/app/privacy-page';
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

export default function LocalePrivacyPage({ params }: Props) {
  const locale = params.locale;
  const currentTranslations = translations[locale] || translations.en;

  return (
    <TranslationProvider locale={locale} translations={currentTranslations}>
      <PrivacyPage />
    </TranslationProvider>
  );
}
export const generateMetadata = createLocalePageMetadata('privacy');
