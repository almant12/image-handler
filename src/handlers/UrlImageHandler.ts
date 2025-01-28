import fs from 'fs';
import path from 'path';
import { BaseImageHandler } from './BaseImageHandler';
import { generateFilename } from '../utils/generateFilename';

export class UrlImageHandler extends BaseImageHandler {
  async save(imageUrl: string, destinationPath?: string): Promise<string> {
    const uploadsDir = this.resolveDestinationPath(destinationPath);
    const ext = '.jpg';
    const filename = generateFilename(ext);

    const filePath = path.join(uploadsDir, filename);
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(filePath, buffer);
    return path.relative(path.join(process.cwd(), 'public'), filePath);
  }

  async update(imageUrl: string, oldPath: string, destinationPath?: string): Promise<string> {
    await this.delete(oldPath);
    return this.save(imageUrl, destinationPath);
  }
}
