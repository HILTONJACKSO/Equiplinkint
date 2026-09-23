import { BookingsClient } from './BookingsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookings Management - Equiplink Admin',
  description: 'Manage equipment rentals and logistics bookings',
};

export default function Page() {
  return <BookingsClient />;
}
