'use client';

import { useEffect, useState, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageIntro from '@/components/PageIntro';
import ShareButtons from '@/components/ShareButtons';
import MediaDisplay from '@/components/MediaDisplay';
import { useTranslations } from '@/lib/TranslationContext';
import { MediaType, getMediaTypeLabel } from '@/lib/media';
import { absoluteUrl } from '@/lib/site';
import { Loader2, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

interface GalleryItem {
  _id: string;
  title: string;
  image_url: string;
  media_type: MediaType;
  category: string;
  order: number;
}

type FilterType = 'all' | MediaType;

export default function GalleryPage() {
  const { locale } = useTranslations();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const isHi = locale === 'hi';

  useEffect(() => {
    async function fetchGallery() {
      try {
        const response = await fetch('/api/gallery');
        const result = await response.json();
        if (result.data) {
          setGallery(
            result.data.sort((a: GalleryItem, b: GalleryItem) => a.order - b.order)
          );
        }
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: isHi ? 'सभी' : 'All' },
    { value: 'image', label: isHi ? 'फ़ोटो' : 'Photos' },
    { value: 'video', label: isHi ? 'वीडियो' : 'Videos' },
    { value: 'banner', label: isHi ? 'बैनर' : 'Banners' },
  ];

  const filteredGallery =
    activeFilter === 'all'
      ? gallery
      : gallery.filter((item) => (item.media_type || 'image') === activeFilter);

  const selectedItem = selectedIndex !== null ? filteredGallery[selectedIndex] : null;

  const openItem = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filteredGallery.length);
  }, [selectedIndex, filteredGallery.length]);

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + filteredGallery.length) % filteredGallery.length);
  }, [selectedIndex, filteredGallery.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedIndex, goNext, goPrev]);

  const counts = {
    image: gallery.filter((g) => (g.media_type || 'image') === 'image').length,
    video: gallery.filter((g) => g.media_type === 'video').length,
    banner: gallery.filter((g) => g.media_type === 'banner').length,
  };

  const shareUrl = selectedItem
    ? absoluteUrl(`/${locale}/gallery?item=${selectedItem._id}`)
    : absoluteUrl(`/${locale}/gallery`);

  const banners = filteredGallery.filter((g) => g.media_type === 'banner');
  const rest = filteredGallery.filter((g) => g.media_type !== 'banner');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageIntro
        title={isHi ? 'गैलरी' : 'Gallery'}
        subtitle={isHi ? 'बहुजन क्रांति पार्टी' : 'Bahujan Kranti Party'}
        description={
          isHi
            ? 'कार्यक्रमों, रैलियों और अभियानों की तस्वीरें और वीडियो।'
            : 'Photos and videos from events, rallies, and campaigns.'
        }
        count={gallery.length}
        countLabel={isHi ? 'कुल मीडिया' : 'total items'}
      />

      <div className="sticky top-[65px] z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-0 overflow-x-auto" aria-label="Filter gallery">
            {filters.map((filter) => {
              const count =
                filter.value === 'all'
                  ? gallery.length
                  : counts[filter.value as keyof typeof counts] ?? 0;
              const active = activeFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`relative px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-colors ${
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {filter.label}
                  <span className="ml-1.5 text-xs text-muted-foreground tabular-nums">
                    {count}
                  </span>
                  {active && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-red-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-red-600" />
              <p className="text-sm text-muted-foreground">
                {isHi ? 'लोड हो रहा है...' : 'Loading...'}
              </p>
            </div>
          ) : filteredGallery.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Images className="h-10 w-10 text-muted-foreground/40 mb-4" />
              <p className="text-foreground font-medium mb-1">
                {isHi ? 'कोई मीडिया नहीं' : 'No media yet'}
              </p>
              <p className="text-sm text-muted-foreground max-w-sm">
                {isHi
                  ? 'इस श्रेणी में अभी कुछ अपलोड नहीं हुआ है।'
                  : 'Nothing has been uploaded in this category yet.'}
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {banners.length > 0 && (
                <div className="space-y-3">
                  {banners.map((item) => {
                    const idx = filteredGallery.indexOf(item);
                    return (
                      <button
                        key={item._id}
                        onClick={() => openItem(idx)}
                        className="group w-full text-left rounded-lg overflow-hidden border border-border hover:border-red-600/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                      >
                        <div className="relative aspect-[21/6] sm:aspect-[21/5] bg-muted">
                          <MediaDisplay
                            url={item.image_url}
                            type="banner"
                            alt={item.title}
                            className="w-full h-full object-cover"
                            controls={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                            <span className="text-xs font-medium text-white/70 uppercase tracking-wide">
                              {isHi ? 'बैनर' : 'Banner'}
                            </span>
                            <p className="text-white font-semibold text-lg mt-0.5">{item.title}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {rest.length > 0 && (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                  {rest.map((item) => {
                    const idx = filteredGallery.indexOf(item);
                    const type = item.media_type || 'image';
                    return (
                      <button
                        key={item._id}
                        onClick={() => openItem(idx)}
                        className="group w-full text-left break-inside-avoid rounded-lg overflow-hidden border border-border bg-card hover:border-red-600/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                      >
                        <div className="relative bg-muted">
                          <MediaDisplay
                            url={item.image_url}
                            type={type}
                            alt={item.title}
                            className={`w-full object-cover ${
                              type === 'video' ? 'aspect-video' : 'aspect-[4/3]'
                            }`}
                            showPlayIcon={type === 'video'}
                            controls={false}
                          />
                          {type === 'video' && (
                            <span className="absolute top-2.5 left-2.5 bg-black/70 text-white text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded">
                              {isHi ? 'वीडियो' : 'Video'}
                            </span>
                          )}
                        </div>
                        <div className="px-3.5 py-3 border-t border-border">
                          <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-red-600 transition-colors">
                            {item.title}
                          </p>
                          {item.category && item.category !== 'general' && (
                            <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                              {item.category}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {selectedItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-white min-w-0 pr-4">
                <p className="font-semibold truncate">{selectedItem.title}</p>
                <p className="text-xs text-white/50 mt-0.5">
                  {selectedIndex + 1} / {filteredGallery.length}
                  {' · '}
                  {getMediaTypeLabel(selectedItem.media_type || 'image', locale)}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <ShareButtons
                  variant="compact"
                  inverted
                  content={{
                    title: selectedItem.title,
                    text: isHi
                      ? 'बहुजन क्रांति पार्टी गैलरी'
                      : 'Bahujan Kranti Party Gallery',
                    url: shareUrl,
                  }}
                />
                <button
                  onClick={closeLightbox}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden bg-black">
              <MediaDisplay
                url={selectedItem.image_url}
                type={selectedItem.media_type || 'image'}
                alt={selectedItem.title}
                className="w-full max-h-[70vh] object-contain mx-auto"
                controls={selectedItem.media_type === 'video'}
              />
            </div>

            {filteredGallery.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 sm:-translate-x-14 p-2 text-white/60 hover:text-white transition-colors hidden sm:block"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-14 p-2 text-white/60 hover:text-white transition-colors hidden sm:block"
                  aria-label="Next"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
                <div className="flex justify-center gap-3 mt-4 sm:hidden">
                  <button
                    onClick={goPrev}
                    className="px-4 py-2 text-sm text-white/80 border border-white/20 rounded hover:bg-white/10"
                  >
                    {isHi ? 'पिछला' : 'Previous'}
                  </button>
                  <button
                    onClick={goNext}
                    className="px-4 py-2 text-sm text-white/80 border border-white/20 rounded hover:bg-white/10"
                  >
                    {isHi ? 'अगला' : 'Next'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
