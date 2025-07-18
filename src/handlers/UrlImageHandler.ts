import fs from "fs";
import path from "path";
import { BaseImageHandler } from "./BaseImageHandler";
import { generateFilename } from "../utils/generateFilename";

export class UrlImageHandler extends BaseImageHandler {
  async save(imageUrl: string, destinationPath?: string): Promise<string> {
    const uploadsDir = this.resolveDestinationPath(destinationPath);

    const urlPath = new URL(imageUrl).pathname;
    const ext = path.extname(urlPath) || ".jpg"; // get extension from URL

    const filename = generateFilename(ext);
    const filePath = path.join(uploadsDir, filename);

    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(filePath, buffer);
    // Ensure that the returned path uses forward slashes
    const relativePath = path.relative(
      path.join(process.cwd(), "public"),
      filePath
    );

    // Replace backslashes with forward slashes for compatibility
    return "/" + relativePath.replace(/\\/g, "/");
  }

  async update(
    imageUrl: string,
    oldPath: string,
    destinationPath?: string
  ): Promise<string> {
    await this.delete(oldPath);
    return this.save(imageUrl, destinationPath);
  }
}
