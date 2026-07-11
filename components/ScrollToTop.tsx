'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/TranslationContext';

export default function ScrollToTop() {
  const { locale } = useTranslations();
  const isHi = locale === 'hi';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label={isHi ? 'ऊपर जाएँ' : 'Back to top'}
      className={cn(
        'fixed bottom-5 right-5 z-[60] flex h-11 w-11 items-center justify-center rounded-full',
        'bg-red-600 text-white shadow-lg shadow-red-600/25',
        'transition-all duration-300 hover:bg-red-700 hover:scale-105',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      )}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.25} />
    </button>
  );
}
