import fs from 'fs';
import path from 'path';
import { ensureDirectory } from '../utils/ensureDirectory';

export abstract class BaseImageHandler {
  protected defaultUploadsDir: string;

  constructor() {
    this.defaultUploadsDir = path.join(process.cwd(), 'public');
    ensureDirectory(this.defaultUploadsDir);
  }

  protected resolveDestinationPath(destinationPath?: string): string {
    const resolvedPath = 'public/'+destinationPath || this.defaultUploadsDir;
    ensureDirectory(resolvedPath);
    return resolvedPath;
  }

  abstract save(image: File | string, destinationPath?: string): Promise<string>;

  async delete(filePath: string): Promise<void> {
    const absolutePath = path.join(process.cwd(), filePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  }
}
