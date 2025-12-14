import { Card, CardContent } from '@/components/ui/card';

interface LeaderCardProps {
  name: string;
  position: string;
  bio: string;
  image_url: string;
}

export default function LeaderCard({ name, position, bio, image_url }: LeaderCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-red-100 to-blue-100">
        <img
          src={image_url}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-red-600 font-semibold mb-3">{position}</p>
        <p className="text-gray-600 line-clamp-4">{bio}</p>
      </CardContent>
    </Card>
  );
}
