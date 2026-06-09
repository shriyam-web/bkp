'use client';

import dynamic from 'next/dynamic';
import { Upload, Trash2 } from 'lucide-react';
import { MediaType } from '@/lib/media';
import MediaDisplay from '@/components/MediaDisplay';

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
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      options={{
        resourceType,
        sources: ['local', 'url', 'camera'],
        multiple: false,
      }}
      onSuccess={(result: { event: string; info: { secure_url: string; resource_type?: string } }) => {
        if (result.event === 'success') {
          const detectedType: MediaType =
            result.info.resource_type === 'video' ? 'video' : mediaType;
          onMediaChange(result.info.secure_url, detectedType);
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
  );
}
