import { DashboardClient } from './DashboardClient';
import { getInventory } from '@/app/actions/inventory';

export default async function AdminDashboard() {
  const equipment = await getInventory();
  
  return <DashboardClient equipment={equipment} />;
}
