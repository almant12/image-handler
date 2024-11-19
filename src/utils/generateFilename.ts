import { v4 as uuidv4 } from 'uuid';

export function generateFilename(extension: string): string {
  return `${uuidv4()}${extension}`;
}