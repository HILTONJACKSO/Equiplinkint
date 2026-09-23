import { VerificationClient } from './VerificationClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Verification - Equiplink Admin',
  description: 'Review supplier and operator documents',
};

export default function Page() {
  return <VerificationClient />;
}
