import type { MetadataRoute } from 'next';
import { i18n } from '@/i18n.config';
import { absoluteUrl } from '@/lib/site';
import { PAGE_SEO, localePath } from '@/lib/seo';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const page of Object.values(PAGE_SEO)) {
    for (const locale of i18n.locales) {
      const path = localePath(locale, page.path);
      entries.push({
        url: absoluteUrl(path),
        lastModified: now,
        changeFrequency: page.changeFrequency || 'monthly',
        priority: page.priority ?? 0.7,
      });
    }
  }

  try {
    await dbConnect();
    const articles = await News.find({})
      .select('_id updatedAt published_at')
      .sort({ published_at: -1 })
      .limit(200)
      .lean();

    for (const article of articles) {
      const id = String(article._id);
      const lastModified =
        (article.updatedAt as Date) ||
        (article.published_at as Date) ||
        now;

      for (const locale of i18n.locales) {
        entries.push({
          url: absoluteUrl(`/${locale}/news/${id}`),
          lastModified,
          changeFrequency: 'weekly',
          priority: 0.65,
        });
      }
    }
  } catch {
    // Sitemap still returns static routes if DB is unavailable
  }

  return entries;
}
