import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  published_at: string;
}

export default function NewsCard({ id, title, excerpt, image_url, published_at }: NewsCardProps) {
  const formattedDate = new Date(published_at).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/news/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image_url}
            alt={title}
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
