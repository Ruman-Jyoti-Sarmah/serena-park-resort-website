import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { eventsApi } from '@/db/api';
import type { Event } from '@/types/types';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await eventsApi.getAll();
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultEvents = [
    {
      id: '1',
      title: 'Luxury Weddings',
      description: 'Create unforgettable memories with our bespoke wedding packages in nature. Our dedicated team will ensure your special day is perfect in every way.',
      image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      category: 'weddings',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Corporate Retreats',
      description: 'Professional meeting spaces with state-of-the-art facilities. Perfect for team building, conferences, and corporate events.',
      image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
      category: 'corporate',
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Wellness Retreats',
      description: 'Rejuvenate your mind and body with our comprehensive wellness programs. Yoga, meditation, spa treatments, and healthy cuisine.',
      image_url: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
      category: 'wellness',
      created_at: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Private Celebrations',
      description: 'Celebrate special moments in our exclusive venues. Birthdays, anniversaries, and family gatherings made memorable.',
      image_url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
      category: 'celebrations',
      created_at: new Date().toISOString(),
    },
  ];

  const displayEvents = events.length > 0 ? events : defaultEvents;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Events & Weddings</h1>
          <p className="text-xl md:text-2xl">Celebrate life's special moments with us</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover-lift">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={event.image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3">{event.title}</h3>
                  <p className="text-muted-foreground mb-6">{event.description}</p>
                  <Button asChild>
                    <Link to="/contact">Inquire Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
