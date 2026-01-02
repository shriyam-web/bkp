'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function WebsiteLoader() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Remove from DOM after fade animation completes (0.5s)
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = 'unset';
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!show) return null;

  return (
    <div 
      className={`fixed top-0 left-0 z-[9999] bg-white transition-opacity duration-500 flex flex-col items-center justify-center ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
      }}
    >
      <div className="relative w-full h-3/4">
        <Image
          src="/flag.png"
          alt="Loading"
          fill
          priority
          className="object-contain"
        />
      </div>
      <p className="text-lg font-medium text-gray-700 mt-4 animate-pulse">Loading Bahujan Kranti Party Website...</p>
    </div>
  );
}
