'use server';

import fs from 'fs';
import path from 'path';

export async function getSiteContent() {
  const filePath = path.join(process.cwd(), 'src/data/siteContent.json');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading site content:', error);
    return null;
  }
}

export async function updateSiteContent(newData: any) {
  const filePath = path.join(process.cwd(), 'src/data/siteContent.json');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const currentData = JSON.parse(fileContents);
    const updatedData = { ...currentData, ...newData };
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
    return { success: true };
  } catch (error) {
    console.error('Error writing site content:', error);
    return { success: false, error: 'Failed to update content' };
  }
}
