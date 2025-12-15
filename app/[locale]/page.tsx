import { Locale, i18n } from '@/i18n.config';
import { TranslationProvider } from '@/lib/TranslationContext';
import HomePage from '@/app/home';
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

export default function LocalePage({ params }: Props) {
  const locale = params.locale;
  const currentTranslations = translations[locale] || translations.en;

  return (
    <TranslationProvider locale={locale} translations={currentTranslations}>
      <HomePage />
    </TranslationProvider>
  );
}
