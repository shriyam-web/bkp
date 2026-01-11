import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from '@/lib/TranslationContext';
import { formatDate } from '@/lib/utils';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  published_at: string;
}

export default function NewsCard({ id, title, excerpt, image_url, published_at }: NewsCardProps) {
  const [imageError, setImageError] = useState(false);
  const { locale } = useTranslations();
  const formattedDate = formatDate(published_at);

  const displayImage = !imageError && image_url ? image_url : 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22sans-serif%22 font-size=%2216%22 fill=%22%23999%22%3ENo Image%3C/text%3E%3C/svg%3E';

  return (
    <Link href={`/${locale}/news/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full group">
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <img
            src={displayImage}
            alt={title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            {formattedDate}
          </div>
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-red-600 transition-colors">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 line-clamp-3">{excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
