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

  async update(image: File, oldPath: string, destinationPath?: string): Promise<string> {
    await this.delete(oldPath);
    return this.save(image, destinationPath);
  }
}
