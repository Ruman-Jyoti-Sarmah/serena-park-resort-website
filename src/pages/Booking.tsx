import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { roomsApi, bookingsApi } from '@/db/api';
import { supabase } from '@/db/supabase';
import type { Room } from '@/types/types';
import { CalendarIcon } from 'lucide-react';
import { format, differenceInDays, addDays } from 'date-fns';
import { cn } from '@/lib/utils';

export default function Booking() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guestCount, setGuestCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    const roomId = searchParams.get('room');
    if (roomId && rooms.length > 0) {
      const room = rooms.find((r) => r.id === roomId);
      if (room) setSelectedRoom(room);
    }
  }, [searchParams, rooms]);

  const loadRooms = async () => {
    try {
      const data = await roomsApi.getAvailable();
      setRooms(data);
    } catch (error) {
      console.error('Failed to load rooms:', error);
    }
  };

  const calculateTotalPrice = () => {
    if (!selectedRoom || !checkInDate || !checkOutDate) return 0;
    const nights = differenceInDays(checkOutDate, checkInDate);
    return nights * selectedRoom.price_per_night;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to make a booking',
        variant: 'destructive',
      });
      navigate('/login', { state: { from: '/booking' } });
      return;
    }

    if (!selectedRoom || !checkInDate || !checkOutDate) {
      toast({
        title: 'Missing Information',
        description: 'Please select a room and dates',
        variant: 'destructive',
      });
      return;
    }

    if (guestCount > selectedRoom.max_guests) {
      toast({
        title: 'Too Many Guests',
        description: `This room can accommodate up to ${selectedRoom.max_guests} guests`,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Check availability
      const isAvailable = await bookingsApi.checkAvailability(
        selectedRoom.id,
        format(checkInDate, 'yyyy-MM-dd'),
        format(checkOutDate, 'yyyy-MM-dd')
      );

      if (!isAvailable) {
        toast({
          title: 'Room Unavailable',
          description: 'This room is not available for the selected dates',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // Create booking
      const booking = await bookingsApi.create({
        user_id: user.id,
        room_id: selectedRoom.id,
        check_in_date: format(checkInDate, 'yyyy-MM-dd'),
        check_out_date: format(checkOutDate, 'yyyy-MM-dd'),
        guest_count: guestCount,
        total_price: calculateTotalPrice(),
        special_requests: specialRequests || null,
        status: 'pending',
      });

      // Proceed to payment
      const { data, error } = await supabase.functions.invoke('create_stripe_checkout', {
        body: JSON.stringify({
          items: [
            {
              name: `${selectedRoom.name} - ${differenceInDays(checkOutDate, checkInDate)} nights`,
              price: selectedRoom.price_per_night,
              quantity: differenceInDays(checkOutDate, checkInDate),
              image_url: selectedRoom.images[0] || '',
            },
          ],
          currency: 'usd',
          payment_method_types: ['card'],
        }),
      });

      if (error) {
        const errorMsg = await error?.context?.text();
        console.error('Payment error:', errorMsg || error?.message);
        toast({
          title: 'Payment Error',
          description: errorMsg || 'Failed to create payment session. Please ensure STRIPE_SECRET_KEY is configured.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      if (data?.data?.url) {
        // Open Stripe checkout in new tab
        window.open(data.data.url, '_blank');
        toast({
          title: 'Redirecting to Payment',
          description: 'Please complete your payment in the new window',
        });
        // Navigate to my bookings
        setTimeout(() => {
          navigate('/my-bookings');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: 'Booking Failed',
        description: error.message || 'An error occurred while processing your booking',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const nights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;
  const totalPrice = calculateTotalPrice();

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Book Your Stay</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select Room</Label>
                    <Select
                      value={selectedRoom?.id || ''}
                      onValueChange={(value) => {
                        const room = rooms.find((r) => r.id === value);
                        setSelectedRoom(room || null);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a room" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.name} - ${room.price_per_night}/night
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Check-in Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !checkInDate && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkInDate ? format(checkInDate, 'PPP') : 'Select date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkInDate}
                            onSelect={setCheckInDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Check-out Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !checkOutDate && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOutDate ? format(checkOutDate, 'PPP') : 'Select date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkOutDate}
                            onSelect={setCheckOutDate}
                            disabled={(date) => !checkInDate || date <= checkInDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max={selectedRoom?.max_guests || 10}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requests">Special Requests (Optional)</Label>
                    <Textarea
                      id="requests"
                      rows={4}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Any special requirements or requests..."
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading || !selectedRoom || !checkInDate || !checkOutDate}>
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedRoom ? (
                  <>
                    <div>
                      <h3 className="font-semibold mb-2">{selectedRoom.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedRoom.description}</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price per night:</span>
                        <span className="font-medium">${selectedRoom.price_per_night}</span>
                      </div>
                      {nights > 0 && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Number of nights:</span>
                            <span className="font-medium">{nights}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Guests:</span>
                            <span className="font-medium">{guestCount}</span>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-lg font-bold">
                              <span>Total:</span>
                              <span className="text-primary">${totalPrice}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Select a room to see booking summary
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
