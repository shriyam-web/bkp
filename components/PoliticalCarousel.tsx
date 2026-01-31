'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CAROUSEL_IMAGES = [
  { id: 1, url: '/1.png', alt: 'Bahujan Kranti Party movement' },
  { id: 2, url: '/2.jpg', alt: 'Community engagement and activism' },
  { id: 3, url: '/3.jpg', alt: 'Leadership and social change' },
  { id: 4, url: '/4.jpg', alt: 'Party rally and public gathering' },
  { id: 5, url: '/5.jpg', alt: 'Citizens united for progress' },
];

export default function PoliticalCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
    setIsAutoplay(false);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    setIsAutoplay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
  };

  return (
    <div className="relative w-full h-full bg-gray-900" style={{ height: '600px' }}>
      <div className="relative w-full h-full">
        {CAROUSEL_IMAGES.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${
              index === currentSlide ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
            }`}
            style={{
              pointerEvents: index === currentSlide ? 'auto' : 'none',
            }}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
              style={{ display: 'block' }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/30 p-2 hover:bg-white/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/30 p-2 hover:bg-white/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 w-2 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
