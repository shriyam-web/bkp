/** Shared Cloudinary Upload Widget options for large media (videos ~100MB). */

export const MAX_UPLOAD_BYTES = 100 * 1024 * 1024; // 100 MB (Cloudinary Free plan video limit)
export const UPLOAD_CHUNK_BYTES = 6 * 1024 * 1024; // 6 MB chunks for large files

export const CLOUDINARY_SIGN_ENDPOINT = '/api/cloudinary/sign';

export function cloudinaryUploadOptions(resourceType: 'image' | 'video' | 'auto' = 'auto') {
  return {
    resourceType,
    sources: ['local', 'url'] as ('local' | 'url')[],
    multiple: false,
    maxFileSize: MAX_UPLOAD_BYTES,
    maxImageFileSize: MAX_UPLOAD_BYTES,
    maxVideoFileSize: MAX_UPLOAD_BYTES,
    // Chunked upload required for files that would otherwise hit browser/network limits
    chunkSize: UPLOAD_CHUNK_BYTES,
  };
}

/**
 * Signed uploads need NEXT_PUBLIC_CLOUDINARY_API_KEY on the client.
 * Without it, next-cloudinary throws during render and crashes the page.
 * Fall back to unsigned preset when the public API key is missing.
 */
export function cloudinaryWidgetAuthProps(preferSigned = false) {
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const canSign = Boolean(apiKey);

  if (preferSigned && canSign) {
    return {
      signatureEndpoint: CLOUDINARY_SIGN_ENDPOINT,
      ...(uploadPreset ? { uploadPreset } : {}),
    };
  }

  return uploadPreset ? { uploadPreset } : {};
}
