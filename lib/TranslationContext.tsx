'use client';

import { createContext, useContext } from 'react';
import { Locale } from '@/i18n.config';

type TranslationContextType = {
  locale: Locale;
  translations: Record<string, any>;
  t: (key: string, defaultValue?: string) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({
  children,
  locale,
  translations,
}: {
  children: React.ReactNode;
  locale: Locale;
  translations: Record<string, any>;
}) {
  const t = (key: string, defaultValue: string = key) => {
    const keys = key.split('.');
    let value = translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        return defaultValue;
      }
    }

    return typeof value === 'string' ? value : defaultValue;
  };

  return (
    <TranslationContext.Provider value={{ locale, translations, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslations must be used within a TranslationProvider');
  }
  return context;
}
