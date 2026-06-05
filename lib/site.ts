export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://bahujankrantiparty.org';

export function absoluteUrl(path: string) {
  const base = SITE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
