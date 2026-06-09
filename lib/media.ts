export type MediaType = 'image' | 'video' | 'banner';

export interface MediaAttachment {
  type: MediaType;
  url: string;
  title?: string;
}

export const MEDIA_TYPES: { value: MediaType; label: string; labelHi: string }[] = [
  { value: 'image', label: 'Photo', labelHi: 'फ़ोटो' },
  { value: 'video', label: 'Video', labelHi: 'वीडियो' },
  { value: 'banner', label: 'Banner', labelHi: 'बैनर' },
];

export function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url) || /\/video\/upload\//i.test(url);
}

export function getMediaTypeFromUrl(url: string, fallback: MediaType = 'image'): MediaType {
  if (isVideoUrl(url)) return 'video';
  return fallback;
}

export function getMediaTypeLabel(type: MediaType, locale: string): string {
  const item = MEDIA_TYPES.find((m) => m.value === type);
  if (!item) return type;
  return locale === 'hi' ? item.labelHi : item.label;
}
