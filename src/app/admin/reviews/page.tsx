import { ReviewsClient } from './ReviewsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reviews & Ratings - Equiplink Admin',
  description: 'Moderate user reviews and platform feedback',
};

export default function Page() {
  return <ReviewsClient />;
}
