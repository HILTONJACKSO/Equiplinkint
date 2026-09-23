import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const filename = (await params).filename;
    
    // Check both standard public/uploads and standalone public/uploads
    let uploadDir = path.join(process.cwd(), 'public', 'uploads');
    let filePath = path.join(uploadDir, filename);
    
    if (!fs.existsSync(filePath)) {
      // Try resolving relative to project root in case process.cwd() is inside .next/standalone
      const rootDir = process.cwd().includes('.next') 
        ? path.join(process.cwd(), '..', '..')
        : process.cwd();
        
      uploadDir = path.join(rootDir, 'public', 'uploads');
      filePath = path.join(uploadDir, filename);
      
      if (!fs.existsSync(filePath)) {
        return new NextResponse('File not found', { status: 404 });
      }
    }

    const fileBuffer = fs.readFileSync(filePath);
    
    // Determine content type based on extension
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.svg') contentType = 'image/svg+xml';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache for 1 day
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
