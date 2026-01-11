import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState } from 'react';
import { formatDate } from '@/lib/utils';

interface EventCardProps {
  title: string;
  description: string;
  location: string;
  event_date: string;
  image_url: string;
}

export default function EventCard({ title, description, location, event_date, image_url }: EventCardProps) {
  const [imageError, setImageError] = useState(false);
  const formattedDate = formatDate(event_date, true);

  const displayImage = !imageError && image_url ? image_url : 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22sans-serif%22 font-size=%2216%22 fill=%22%23999%22%3ENo Image%3C/text%3E%3C/svg%3E';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={displayImage}
          alt={title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-gray-600 line-clamp-2">{description}</p>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-1 text-red-600" />
          {formattedDate}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1 text-red-600" />
          {location}
        </div>
      </CardContent>
    </Card>
  );
}
