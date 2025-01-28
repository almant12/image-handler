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
    return path.relative(path.join(process.cwd(), 'public'), filePath);
  }

    /**
   * Saves multiple images to the destination path.
   * @param images An array of File objects to save.
   * @param destinationPath The path where the images will be saved.
   * @returns An array of relative file paths for the saved images.
   */
    async saveMultiple(images: File[], destinationPath?: string): Promise<string[]> {
      const savedPaths: string[] = [];
  
      for (const image of images) {
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
