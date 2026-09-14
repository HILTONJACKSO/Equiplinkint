import fs from 'fs';
import path from 'path';

// Standard utility function (NOT a server action) for Server Components
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

// Server action (must have 'use server')
export async function updateSiteContent(newData: any) {
  'use server';
  const filePath = path.join(process.cwd(), 'src/data/siteContent.json');
  try {
    // Read current data
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const currentData = JSON.parse(fileContents);

    // Merge new data (deep merge could be better, but we'll assign top-level keys)
    const updatedData = { ...currentData, ...newData };

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
    
    return { success: true };
  } catch (error) {
    console.error('Error writing site content:', error);
    return { success: false, error: 'Failed to update content' };
  }
}
