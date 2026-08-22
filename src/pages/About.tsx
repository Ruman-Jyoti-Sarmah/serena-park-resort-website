import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Heart, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Serena Park Resort</h1>
          <p className="text-xl md:text-2xl">Where Luxury Meets Nature</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-6">
              <p>
                Nestled in the heart of nature's paradise, Serena Park Resort has been a beacon of luxury and tranquility for over 15 years. Our journey began with a simple vision: to create a sanctuary where guests can escape the hustle of everyday life and reconnect with nature without compromising on comfort.
              </p>
              <p>
                Every corner of our resort tells a story of dedication to excellence, sustainability, and genuine hospitality. From our eco-friendly architecture that blends seamlessly with the surrounding landscape to our commitment to preserving the natural beauty that surrounds us, we've created more than just a resort – we've created an experience.
              </p>
              <p>
                Our team of passionate professionals works tirelessly to ensure that every guest feels not just welcomed, but truly at home. Whether you're here for a romantic getaway, a family vacation, or a corporate retreat, we promise an unforgettable experience that will leave you refreshed, rejuvenated, and eager to return.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  Committed to eco-friendly practices and preserving our natural environment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hospitality</h3>
                <p className="text-muted-foreground">
                  Genuine care and attention to every guest's needs and comfort
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  Unwavering commitment to the highest standards of quality and service
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  Building lasting relationships with guests and local communities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
