'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const inventoryFilePath = path.join(process.cwd(), 'src/data/inventory.json');

export type Equipment = {
  id: string;
  title: string;
  category: string;
  specs: string[];
  rate: string;
  image: string;
};

// Utility to read without Server Action wrapper for Server Components
export async function getInventory(): Promise<Equipment[]> {
  try {
    if (!fs.existsSync(inventoryFilePath)) {
      return [];
    }
    const fileContents = fs.readFileSync(inventoryFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading inventory:', error);
    return [];
  }
}

export async function addEquipment(item: Omit<Equipment, 'id'>) {
  try {
    const inventory = await getInventory();
    const newItem = {
      ...item,
      id: `eq-${Date.now()}`
    };
    inventory.push(newItem);
    fs.writeFileSync(inventoryFilePath, JSON.stringify(inventory, null, 2));
    revalidatePath('/');
    revalidatePath('/equipment');
    revalidatePath('/admin/equipment');
    return { success: true, data: newItem };
  } catch (error) {
    console.error('Error adding equipment:', error);
    return { success: false, error: 'Failed to add equipment' };
  }
}

export async function updateEquipment(id: string, updates: Partial<Equipment>) {
  try {
    const inventory = await getInventory();
    const index = inventory.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Item not found');
    
    inventory[index] = { ...inventory[index], ...updates };
    fs.writeFileSync(inventoryFilePath, JSON.stringify(inventory, null, 2));
    
    revalidatePath('/');
    revalidatePath('/equipment');
    revalidatePath('/admin/equipment');
    return { success: true };
  } catch (error) {
    console.error('Error updating equipment:', error);
    return { success: false, error: 'Failed to update equipment' };
  }
}

export async function deleteEquipment(id: string) {
  try {
    const inventory = await getInventory();
    const newInventory = inventory.filter(item => item.id !== id);
    fs.writeFileSync(inventoryFilePath, JSON.stringify(newInventory, null, 2));
    
    revalidatePath('/');
    revalidatePath('/equipment');
    revalidatePath('/admin/equipment');
    return { success: true };
  } catch (error) {
    console.error('Error deleting equipment:', error);
    return { success: false, error: 'Failed to delete equipment' };
  }
}
