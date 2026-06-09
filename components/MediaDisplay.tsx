'use client';

import { MediaType, isVideoUrl } from '@/lib/media';
import { Play } from 'lucide-react';

interface MediaDisplayProps {
  url: string;
  type?: MediaType;
  alt?: string;
  className?: string;
  showPlayIcon?: boolean;
  controls?: boolean;
}

export default function MediaDisplay({
  url,
  type,
  alt = '',
  className = '',
  showPlayIcon = false,
  controls = true,
}: MediaDisplayProps) {
  const isVideo = type === 'video' || isVideoUrl(url);

  if (isVideo) {
    return (
      <div className={`relative ${className}`}>
        <video
          src={url}
          className={className}
          controls={controls}
          playsInline
          preload="metadata"
        />
        {showPlayIcon && !controls && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/50 rounded-full p-4">
              <Play className="h-8 w-8 text-white fill-white" />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      className={className}
    />
  );
}
