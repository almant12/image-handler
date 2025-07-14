import fs from "fs";
import path from "path";
import { ensureDirectory } from "../utils/ensureDirectory";

export abstract class BaseImageHandler {
  protected defaultUploadsDir: string;

  constructor() {
    this.defaultUploadsDir = path.join(process.cwd(), "public");
    ensureDirectory(this.defaultUploadsDir);
  }

  protected resolveDestinationPath(destinationPath?: string): string {
    const resolvedPath = destinationPath
      ? path.join(this.defaultUploadsDir, destinationPath)
      : this.defaultUploadsDir;

    ensureDirectory(resolvedPath);
    return resolvedPath;
  }

  async delete(filePath: string): Promise<void> {
    const absolutePath = path.join(process.cwd(), "public", filePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  }
}
