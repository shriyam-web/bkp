'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CAROUSEL_IMAGES = [
  {
    id: 1,
    url: '/1.png',
    alt: 'Bahujan Kranti Party movement',
  },
  {
    id: 2,
    url: '/2.jpg',
    alt: 'Community engagement and activism',
  },
  {
    id: 3,
    url: '/3.jpg',
    alt: 'Leadership and social change',
  },
  {
    id: 4,
    url: '/4.jpg',
    alt: 'Party rally and public gathering',
  },
  {
    id: 5,
    url: '/5.jpg',
    alt: 'Citizens united for progress',
  },
];

export default function PoliticalCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);

    return () => clearInterval(autoplayInterval);
  }, []);

  const scrollPrev = () => {
    setSelectedIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  const scrollNext = () => {
    setSelectedIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  const scrollTo = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-800">
      <div className="relative w-full h-full">
        {CAROUSEL_IMAGES.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === selectedIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/30 p-2 hover:bg-white/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/30 p-2 hover:bg-white/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              index === selectedIndex
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
