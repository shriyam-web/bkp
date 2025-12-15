import { Locale } from '@/i18n.config';
import { TranslationProvider } from '@/lib/TranslationContext';
import LeadershipPage from '@/app/leadership-page';
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

export default function LocaleLeadershipPage({ params }: Props) {
  const locale = params.locale;
  const currentTranslations = translations[locale] || translations.en;

  return (
    <TranslationProvider locale={locale} translations={currentTranslations}>
      <LeadershipPage />
    </TranslationProvider>
  );
}
