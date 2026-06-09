import { Calendar, Play, ArrowRight, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from '@/lib/TranslationContext';
import { formatDate } from '@/lib/utils';
import { MediaType } from '@/lib/media';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  media_type?: MediaType;
  published_at: string;
  variant?: 'card' | 'featured' | 'list';
}

export default function NewsCard({
  id,
  title,
  excerpt,
  image_url,
  media_type,
  published_at,
  variant = 'card',
}: NewsCardProps) {
  const [imageError, setImageError] = useState(false);
  const { locale } = useTranslations();
  const formattedDate = formatDate(published_at, true);
  const readLabel = locale === 'hi' ? 'पढ़ें' : 'Read';

  const displayImage =
    !imageError && image_url
      ? image_url
      : null;

  if (variant === 'featured') {
    return (
      <Link
        href={`/${locale}/news/${id}`}
        className="group grid grid-cols-1 lg:grid-cols-5 gap-0 border border-border rounded-lg overflow-hidden bg-card hover:border-red-600/40 transition-colors"
      >
        <div className="relative lg:col-span-3 aspect-[16/9] lg:aspect-auto lg:min-h-[320px] bg-muted overflow-hidden">
          {displayImage ? (
            <img
              src={displayImage}
              alt={title}
              onError={() => setImageError(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <ImageIcon className="h-12 w-12 opacity-30" />
            </div>
          )}
          {media_type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="bg-red-600 rounded-full p-4">
                <Play className="h-6 w-6 text-white fill-white" />
              </div>
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className="bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded">
              {locale === 'hi' ? 'नवीनतम' : 'Latest'}
            </span>
          </div>
        </div>
        <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-border">
          <time className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3">
            <Calendar className="h-3.5 w-3.5" />
            {formattedDate}
          </time>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground leading-snug group-hover:text-red-600 transition-colors mb-3">
            {title}
          </h2>
          <p className="text-muted-foreground leading-relaxed line-clamp-4 mb-5">{excerpt}</p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600">
            {readLabel}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </Link>
    );
  }

  if (variant === 'list') {
    return (
      <Link
        href={`/${locale}/news/${id}`}
        className="group flex gap-4 sm:gap-6 py-5 border-b border-border last:border-0 hover:bg-muted/30 -mx-4 px-4 sm:-mx-6 sm:px-6 transition-colors"
      >
        <div className="relative w-24 h-20 sm:w-32 sm:h-24 shrink-0 rounded overflow-hidden bg-muted">
          {displayImage ? (
            <img
              src={displayImage}
              alt={title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="h-6 w-6 text-muted-foreground/40" />
            </div>
          )}
          {media_type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Play className="h-4 w-4 text-white fill-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <time className="text-xs text-muted-foreground">{formattedDate}</time>
          <h3 className="font-semibold text-foreground mt-1 line-clamp-2 group-hover:text-red-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2 hidden sm:block">{excerpt}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    );
  }

  return (
    <Link href={`/${locale}/news/${id}`} className="group block h-full">
      <article className="h-full flex flex-col border border-border rounded-lg overflow-hidden bg-card hover:border-red-600/30 transition-colors">
        <div className="relative aspect-[3/2] bg-muted overflow-hidden">
          {displayImage ? (
            <img
              src={displayImage}
              alt={title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
            </div>
          )}
          {media_type === 'video' && (
            <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
              <Play className="h-3 w-3 fill-white" />
              {locale === 'hi' ? 'वीडियो' : 'Video'}
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <time className="text-xs text-muted-foreground mb-2">{formattedDate}</time>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-red-600 transition-colors mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{excerpt}</p>
          <span className="mt-4 text-sm font-medium text-red-600 inline-flex items-center gap-1">
            {readLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
