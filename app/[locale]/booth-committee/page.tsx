import { Locale } from '@/i18n.config';
import { createLocalePageMetadata } from '@/lib/seo';

import { TranslationProvider } from '@/lib/TranslationContext';
import BoothCommitteePage from '@/app/booth-committee-page';
import en from '@/public/locales/en.json';
import hi from '@/public/locales/hi.json';

const translations = { en, hi };

interface Props {
  params: { locale: Locale };
}

export default function LocaleBoothCommitteePage({ params }: Props) {
  const locale = params.locale;
  const currentTranslations = translations[locale] || translations.en;

  return (
    <TranslationProvider locale={locale} translations={currentTranslations}>
      <BoothCommitteePage />
    </TranslationProvider>
  );
}
export const generateMetadata = createLocalePageMetadata('booth-committee');
