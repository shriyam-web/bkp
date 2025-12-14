import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface EventCardProps {
  title: string;
  description: string;
  location: string;
  event_date: string;
  image_url: string;
}

export default function EventCard({ title, description, location, event_date, image_url }: EventCardProps) {
  const formattedDate = new Date(event_date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image_url}
          alt={title}
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
