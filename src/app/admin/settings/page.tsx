import { SettingsClient } from './SettingsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform Settings - Equiplink Admin',
  description: 'Configure global platform preferences',
};

export default function Page() {
  return <SettingsClient />;
}
