import { Locale } from '@/i18n.config';
import { TranslationProvider } from '@/lib/TranslationContext';
import JoinPage from '@/app/join-page';
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

export default function LocaleJoinPage({ params }: Props) {
  const locale = params.locale;
  const currentTranslations = translations[locale] || translations.en;

  return (
    <TranslationProvider locale={locale} translations={currentTranslations}>
      <JoinPage />
    </TranslationProvider>
  );
}
