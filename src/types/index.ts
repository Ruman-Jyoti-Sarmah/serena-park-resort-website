export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export type UserRole = 'user' | 'admin';
export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Profile {
  id: string;
  email: string | null;
  username: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Room {
  id: string;
  name: string;
  description: string | null;
  price_per_night: number;
  max_guests: number;
  amenities: string[];
  images: string[];
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  room_id: string;
  check_in_date: string;
  check_out_date: string;
  guest_count: number;
  total_price: number;
  status: BookingStatus;
  special_requests: string | null;
  created_at: string;
  updated_at: string;
  room?: Room;
  user?: Profile;
}

export interface Order {
  id: string;
  user_id: string | null;
  booking_id: string | null;
  items: any;
  total_amount: number;
  currency: string;
  status: OrderStatus;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  customer_email: string | null;
  customer_name: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  booking?: Booking;
}

export interface GalleryImage {
  id: string;
  title: string | null;
  image_url: string;
  category: string | null;
  display_order: number;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  created_at: string;
}
