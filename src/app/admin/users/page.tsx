import { UsersClient } from './UsersClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users Management - Equiplink Admin',
  description: 'Manage customers and suppliers',
};

export default function UsersPage() {
  return <UsersClient />;
}
