export interface ImageHandler {
    save(image: File | string, destinationPath?: string): Promise<string>;
    delete(filePath: string): Promise<void>;
    update(image: File | string, oldPath: string, destinationPath?: string): Promise<string>;
    saveMultiple(images: File[], destinationPath?: string): Promise<string[]> 
  }