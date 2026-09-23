import { PaymentsClient } from './PaymentsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payments & Transactions - Equiplink Admin',
  description: 'Manage invoices and financial records',
};

export default function Page() {
  return <PaymentsClient />;
}
