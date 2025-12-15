import { Locale } from '@/i18n.config';

const translations: Record<Locale, any> = {
  en: null,
  hi: null,
};

async function loadTranslations(locale: Locale) {
  if (translations[locale] === null) {
    try {
      const response = await fetch(`/locales/${locale}.json`, {
        cache: 'force-cache',
      });
      translations[locale] = await response.json();
    } catch (error) {
      console.error(`Failed to load translations for ${locale}:`, error);
      translations[locale] = {};
    }
  }
  return translations[locale];
}

export async function getTranslations(locale: Locale) {
  return loadTranslations(locale);
}

export function useTranslation(t: any) {
  return {
    t,
  };
}
