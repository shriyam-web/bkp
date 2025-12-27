'use client';

import { useEffect, useState } from 'react';

export default function WebsiteLoader() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Remove from DOM after fade animation completes (0.5s)
    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative w-72 h-44 shadow-2xl overflow-hidden rounded-sm animate-bounce shadow-blue-900/20">
        {/* Flag Design: 80% Red, 20% Dark Blue */}
        <div className="h-[80%] w-full bg-[#FF0000] flex items-center justify-center">
          <span className="text-white font-black text-4xl tracking-tighter drop-shadow-lg">BKP</span>
        </div>
        <div className="h-[20%] w-full bg-[#00008B]"></div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#FF0000] animate-[loading_2.5s_ease-in-out_infinite]"></div>
        </div>
        <p className="text-[#00008B] font-medium animate-pulse">Loading Bahujan Kranti Party...</p>
      </div>
    </div>
  );
}
