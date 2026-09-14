import { getInventory } from '@/app/actions/inventory';
import EquipmentClient from './EquipmentClient';

export default async function AdminEquipmentPage() {
  const inventory = await getInventory();

  return <EquipmentClient initialData={inventory} />;
}
