'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from '@/lib/TranslationContext';
import { Quote } from 'lucide-react';

export default function InspirationPage() {
  const { t, locale } = useTranslations();

  const visionaries = [
    {
      id: 'marx',
      name: t('inspiration.karlMarx'),
      description: t('inspiration.karlMarxDesc'),
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Karl_Marx_001.jpg',
      years: '1818 - 1883'
    },
    {
      id: 'ambedkar',
      name: t('inspiration.brAmbedkar'),
      description: t('inspiration.brAmbedkarDesc'),
      image: '/ambedkar.jpg',
      years: '1891 - 1956'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-blue-800 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-6xl tracking-tight mb-6">
              {t('inspiration.title')}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto font-medium">
              {t('inspiration.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="h-12 w-12 text-red-600 mx-auto mb-6 opacity-20" />
          <p className="text-2xl text-gray-700 italic leading-relaxed">
            "{t('inspiration.description')}"
          </p>
        </div>
      </section>

      {/* Visionaries Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {visionaries.map((visionary) => (
              <div key={visionary.id} className="flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-transform duration-300 hover:-translate-y-2">
                <div className="relative h-[400px] w-full">
                  <Image
                    src={visionary.image}
                    alt={visionary.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-8 text-white">
                    <h2 className="text-3xl font-bold mb-1">{visionary.name}</h2>
                    <p className="text-white/80 font-medium">{visionary.years}</p>
                  </div>
                </div>
                <div className="p-8 sm:p-10 flex-grow">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {visionary.description}
                  </p>
                </div>
                <div className="px-8 pb-8 sm:px-10 sm:pb-10">
                  <div className="h-1 w-20 bg-red-600 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guiding Lights Quote */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">
            {t.locale === 'hi' ? 'हमारे मार्गदर्शक प्रकाश' : 'Our Guiding Lights'}
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            {t.locale === 'hi'
              ? 'कार्ल मार्क्स और डॉ. बी.आर. अंबेडकर के विचार हमें एक ऐसे समाज के निर्माण के लिए प्रेरित करते हैं जहाँ कोई शोषण न हो और हर व्यक्ति को गरिमा के साथ जीने का अधिकार हो।'
              : 'The thoughts of Karl Marx and Dr. B.R. Ambedkar inspire us to build a society where there is no exploitation and every individual has the right to live with dignity.'}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
