import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Hotel, Users, Award, Sparkles, Waves, Utensils, TreePine } from 'lucide-react';

export default function Home() {
  const [counts, setCounts] = useState({ rooms: 0, guests: 0, years: 0 });

  useEffect(() => {
    // Animated counter effect
    const targets = { rooms: 50, guests: 10000, years: 15 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        rooms: Math.floor(targets.rooms * progress),
        guests: Math.floor(targets.guests * progress),
        years: Math.floor(targets.years * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to Serena Park Resort
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Experience luxury in harmony with nature. Your perfect escape awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/booking">Book Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white hover:bg-white/20">
              <Link to="/rooms" className="text-white">Explore Rooms</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Animated Counters */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-5xl font-bold mb-2">{counts.rooms}+</div>
              <div className="text-lg opacity-90">Luxury Rooms</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl font-bold mb-2">{counts.guests.toLocaleString()}+</div>
              <div className="text-lg opacity-90">Happy Guests</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl font-bold mb-2">{counts.years}+</div>
              <div className="text-lg opacity-90">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience Luxury</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover world-class amenities and services designed for your comfort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Hotel className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Luxury Rooms</h3>
                <p className="text-muted-foreground">
                  Elegantly designed suites with stunning views
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Spa & Wellness</h3>
                <p className="text-muted-foreground">
                  Rejuvenate your mind and body
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Utensils className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fine Dining</h3>
                <p className="text-muted-foreground">
                  Exquisite cuisine from around the world
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <TreePine className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Nature Park</h3>
                <p className="text-muted-foreground">
                  Explore beautiful gardens and trails
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Rooms Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Rooms & Suites</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our collection of beautifully appointed accommodations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Deluxe Garden Suite',
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
                price: '$299',
              },
              {
                title: 'Premium Forest Villa',
                image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
                price: '$599',
              },
              {
                title: 'Royal Spa Suite',
                image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
                price: '$899',
              },
            ].map((room, index) => (
              <Card key={index} className="overflow-hidden hover-lift">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{room.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{room.price}</span>
                    <span className="text-muted-foreground">per night</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/rooms">View All Rooms</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for Your Escape?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Book your stay today and experience the perfect blend of luxury and nature
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link to="/booking">Book Your Stay</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
