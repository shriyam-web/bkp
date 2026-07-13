/** Shared Cloudinary Upload Widget options for large media (videos ~100MB). */

export const MAX_UPLOAD_BYTES = 200 * 1024 * 1024; // 200 MB
export const UPLOAD_CHUNK_BYTES = 6 * 1024 * 1024; // 6 MB chunks for large files

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

export const CLOUDINARY_SIGN_ENDPOINT = '/api/cloudinary/sign';
