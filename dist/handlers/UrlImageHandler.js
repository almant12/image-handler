"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlImageHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const BaseImageHandler_1 = require("./BaseImageHandler");
const generateFilename_1 = require("../utils/generateFilename");
class UrlImageHandler extends BaseImageHandler_1.BaseImageHandler {
    save(imageUrl, destinationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadsDir = this.resolveDestinationPath(destinationPath);
            const urlPath = new URL(imageUrl).pathname;
            const ext = path_1.default.extname(urlPath) || ".jpg"; // get extension from URL
            const filename = (0, generateFilename_1.generateFilename)(ext);
            const filePath = path_1.default.join(uploadsDir, filename);
            const response = yield fetch(imageUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.statusText}`);
            }
            const arrayBuffer = yield response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            fs_1.default.writeFileSync(filePath, buffer);
            // Ensure that the returned path uses forward slashes
            const relativePath = path_1.default.relative(path_1.default.join(process.cwd(), "public"), filePath);
            // Replace backslashes with forward slashes for compatibility
            return "/" + relativePath.replace(/\\/g, "/");
        });
    }
    update(imageUrl, oldPath, destinationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.delete(oldPath);
            return this.save(imageUrl, destinationPath);
        });
    }
}
exports.UrlImageHandler = UrlImageHandler;
