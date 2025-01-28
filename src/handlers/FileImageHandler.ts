import fs from 'fs';
import path from 'path';
import { BaseImageHandler } from './BaseImageHandler';
import { ImageHandler } from './ImageHandler';
import { generateFilename } from '../utils/generateFilename';

export class FileImageHandler extends BaseImageHandler implements ImageHandler {
    
  async save(image: File, destinationPath?: string): Promise<string> {
    const uploadsDir = this.resolveDestinationPath(destinationPath);
    const ext = path.extname(image.name);
    const filename = generateFilename(ext);

    const filePath = path.join(uploadsDir, filename);
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    

    fs.writeFileSync(filePath, buffer);
   // Ensure that the returned path uses forward slashes
   const relativePath = path.relative(path.join(process.cwd(), 'public'), filePath);
    
   // Replace backslashes with forward slashes for compatibility
   return '/'+relativePath.replace(/\\/g, '/');
  }

  async saveMultiple(images: File | File[], destinationPath?: string): Promise<string[]> {
    // Ensure images is an array and not null or undefined
    const filesArray = Array.isArray(images) ? images : (images ? [images] : []);
    
    // If no valid images, throw an error or handle it accordingly
    if (filesArray.length === 0) {
      throw new Error("No valid images provided");
    }
  
    const savedPaths: string[] = [];
  
    for (const image of filesArray) {
      const savedPath = await this.save(image, destinationPath);
      savedPaths.push(savedPath);
    }
  
    return savedPaths;
  }

  
  async update(image: File, oldPath: string, destinationPath?: string): Promise<string> {
    await this.delete(oldPath);
    return this.save(image, destinationPath);
  }
}
