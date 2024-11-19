import { FileImageHandler } from './src/handlers/FileImageHandler';
import { UrlImageHandler } from './src/handlers/UrlImageHandler';

export const ImageHandlers = {
  fileHandler: new FileImageHandler(),
  urlHandler: new UrlImageHandler(),
};

