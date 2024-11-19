"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageHandlers = void 0;
const FileImageHandler_1 = require("./src/handlers/FileImageHandler");
const UrlImageHandler_1 = require("./src/handlers/UrlImageHandler");
exports.ImageHandlers = {
    fileHandler: new FileImageHandler_1.FileImageHandler(),
    urlHandler: new UrlImageHandler_1.UrlImageHandler(),
};
