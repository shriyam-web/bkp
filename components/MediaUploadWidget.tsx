'use client';

import dynamic from 'next/dynamic';
import { Upload, Trash2 } from 'lucide-react';
import { MediaType } from '@/lib/media';
import MediaDisplay from '@/components/MediaDisplay';
import {
  cloudinaryUploadOptions,
  cloudinaryWidgetAuthProps,
  MAX_UPLOAD_BYTES,
} from '@/lib/cloudinary-upload';

const CldUploadWidget = dynamic(
  () => import('next-cloudinary').then((mod) => mod.CldUploadWidget),
  { ssr: false }
);

interface MediaUploadWidgetProps {
  mediaUrl: string;
  mediaType: MediaType;
  onMediaChange: (url: string, type: MediaType) => void;
  onClear: () => void;
  label?: string;
}

export default function MediaUploadWidget({
  mediaUrl,
  mediaType,
  onMediaChange,
  onClear,
  label = 'Upload media',
}: MediaUploadWidgetProps) {
  const resourceType = mediaType === 'video' ? 'video' : 'image';
  const maxMb = Math.round(MAX_UPLOAD_BYTES / (1024 * 1024));
  // Prefer signed uploads for video (larger files / preset size caps)
  const authProps = cloudinaryWidgetAuthProps(resourceType === 'video');

  if (mediaUrl) {
    return (
      <div className="relative aspect-video mb-2 group">
        <MediaDisplay
          url={mediaUrl}
          type={mediaType}
          alt="Preview"
          className="w-full h-full object-cover rounded-lg border border-gray-200"
        />
        <button
          type="button"
          onClick={onClear}
          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <CldUploadWidget
        {...authProps}
        options={cloudinaryUploadOptions(resourceType)}
        onSuccess={(result) => {
          const info = result.info;
          if (result.event === 'success' && info && typeof info !== 'string') {
            const detectedType: MediaType =
              info.resource_type === 'video' ? 'video' : mediaType;
            onMediaChange(info.secure_url, detectedType);
          }
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all text-gray-500 hover:text-blue-600"
          >
            <Upload className="h-8 w-8" />
            <span>{label}</span>
          </button>
        )}
      </CldUploadWidget>
      <p className="text-xs text-gray-500 text-center">
        {mediaType === 'video'
          ? `Videos up to ${maxMb} MB supported (chunked upload).`
          : `Files up to ${maxMb} MB supported.`}
      </p>
    </div>
  );
}
