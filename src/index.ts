import { FileImageHandler } from './handlers/FileImageHandler';
import { UrlImageHandler } from './handlers/UrlImageHandler';


export const ImageHandlers = {
  fileHandler: new FileImageHandler(),
  urlHandler: new UrlImageHandler(),
};

