import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import Amenities from './pages/Amenities';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';
import PaymentSuccess from './pages/PaymentSuccess';
import AdminDashboard from './pages/admin/AdminDashboard';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />
  },
  {
    name: 'About',
    path: '/about',
    element: <About />
  },
  {
    name: 'Rooms',
    path: '/rooms',
    element: <Rooms />
  },
  {
    name: 'Amenities',
    path: '/amenities',
    element: <Amenities />
  },
  {
    name: 'Gallery',
    path: '/gallery',
    element: <Gallery />
  },
  {
    name: 'Events',
    path: '/events',
    element: <Events />
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact />
  },
  {
    name: 'Booking',
    path: '/booking',
    element: <Booking />
  },
  {
    name: 'Login',
    path: '/login',
    element: <Login />
  },
  {
    name: 'Register',
    path: '/register',
    element: <Register />
  },
  {
    name: 'My Bookings',
    path: '/my-bookings',
    element: <MyBookings />
  },
  {
    name: 'Payment Success',
    path: '/payment-success',
    element: <PaymentSuccess />
  },
  {
    name: 'Admin Dashboard',
    path: '/admin',
    element: <AdminDashboard />
  }
];

export default routes;
