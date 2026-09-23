import { ReportsClient } from './ReportsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform Reports - Equiplink Admin',
  description: 'View analytics and export data',
};

export default function Page() {
  return <ReportsClient />;
}
