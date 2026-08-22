import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Waves, Utensils, TreePine, Dumbbell, Wifi } from 'lucide-react';

export default function Amenities() {
  const amenities = [
    {
      icon: Sparkles,
      title: 'Luxury Spa',
      description: 'Indulge in rejuvenating treatments and therapies in our world-class spa facility',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    },
    {
      icon: Waves,
      title: 'Infinity Pool',
      description: 'Relax in our stunning infinity pool with breathtaking views',
      image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80',
    },
    {
      icon: Utensils,
      title: 'Fine Dining',
      description: 'Experience exquisite cuisine from our award-winning chefs',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    },
    {
      icon: TreePine,
      title: 'Nature Park',
      description: 'Explore beautiful gardens and walking trails surrounded by nature',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    },
    {
      icon: Dumbbell,
      title: 'Fitness Center',
      description: 'State-of-the-art gym equipment and personal training services',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    },
    {
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Complimentary high-speed internet throughout the resort',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Amenities & Experiences</h1>
          <p className="text-xl md:text-2xl">Everything you need for a perfect stay</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <Card key={index} className="overflow-hidden hover-lift">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={amenity.image}
                      alt={amenity.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">{amenity.title}</h3>
                    <p className="text-muted-foreground">{amenity.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
