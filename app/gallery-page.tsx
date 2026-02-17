'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from '@/lib/TranslationContext';
import { Loader2 } from 'lucide-react';

interface GalleryItem {
  _id: string;
  title: string;
  image_url: string;
  order: number;
}

export default function GalleryPage() {
  const { t, locale } = useTranslations();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const response = await fetch('/api/gallery');
        const result = await response.json();

        if (result.data) {
          setGallery(result.data.sort((a: GalleryItem, b: GalleryItem) => a.order - b.order));
        }
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Header />

      <section className="relative overflow-hidden bg-slate-50 pt-32 pb-20 border-b border-slate-200">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-red-500/5 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-red-600 border border-red-100 mb-6 uppercase">
              {locale === 'hi' ? 'विजुअल जर्नी' : 'VISUAL JOURNEY'}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6 leading-tight">
              {locale === 'hi' ? 'गैलरी' : 'Gallery'} <br />
              <span className="text-slate-500 font-medium text-3xl sm:text-5xl">
                {locale === 'hi' ? 'हमारी स्मृतियां' : 'OUR MOMENTS'}
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl font-normal leading-relaxed border-l-2 border-red-600/40 pl-6">
              {locale === 'hi'
                ? 'हमारे कार्यक्रमों और गतिविधियों की तस्वीरें'
                : 'Photos from our events and activities'
              }
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : gallery.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {gallery.map((item) => (
                  <div
                    key={item._id}
                    className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                  >
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="h-80 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                      <div className="w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="font-semibold">{item.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedImage && (
                <div
                  className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                  onClick={() => setSelectedImage(null)}
                >
                  <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                    <img
                      src={selectedImage.image_url}
                      alt={selectedImage.title}
                      className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                    />
                    <div className="mt-4 text-center">
                      <h3 className="text-xl font-semibold text-white">{selectedImage.title}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                    >
                      <svg
                        className="h-8 w-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {locale === 'hi'
                  ? 'इस समय कोई तस्वीरें उपलब्ध नहीं हैं'
                  : 'No photos available at the moment'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
