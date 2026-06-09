export type SharePlatform = 'whatsapp' | 'twitter' | 'facebook' | 'linkedin' | 'copy' | 'native';

export interface ShareContent {
  title: string;
  text?: string;
  url: string;
}

export function buildShareUrls(content: ShareContent) {
  const { title, text, url } = content;
  const message = text ? `${title}\n\n${text}\n\n${url}` : `${title}\n\n${url}`;

  return {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(message)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export async function shareContent(
  content: ShareContent,
  platform: SharePlatform
): Promise<'shared' | 'copied' | 'opened'> {
  const urls = buildShareUrls(content);

  switch (platform) {
    case 'whatsapp':
      window.open(urls.whatsapp, '_blank', 'noopener,noreferrer');
      return 'opened';
    case 'twitter':
      window.open(urls.twitter, '_blank', 'noopener,noreferrer');
      return 'opened';
    case 'facebook':
      window.open(urls.facebook, '_blank', 'noopener,noreferrer');
      return 'opened';
    case 'linkedin':
      window.open(urls.linkedin, '_blank', 'noopener,noreferrer');
      return 'opened';
    case 'copy': {
      const copied = await copyToClipboard(content.url);
      return copied ? 'copied' : 'opened';
    }
    case 'native':
      if (navigator.share) {
        try {
          await navigator.share({
            title: content.title,
            text: content.text,
            url: content.url,
          });
          return 'shared';
        } catch (err) {
          if ((err as Error).name === 'AbortError') return 'opened';
        }
      }
      await copyToClipboard(content.url);
      return 'copied';
    default:
      return 'opened';
  }
}
