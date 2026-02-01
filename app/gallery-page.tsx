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

      <section className="relative overflow-hidden bg-[#0a0a0a] pt-48 pb-32">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-xs font-bold tracking-[0.2em] text-red-500 border border-white/10 mb-8 backdrop-blur-md uppercase">
              {locale === 'hi' ? 'विजुअल जर्नी' : 'VISUAL JOURNEY'}
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white sm:text-8xl mb-8 leading-[1.1] drop-shadow-2xl">
              {locale === 'hi' ? 'गैलरी' : 'Gallery'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 italic font-serif">
                {locale === 'hi' ? 'हमारी स्मृतियां' : 'OUR MOMENTS'}
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
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
