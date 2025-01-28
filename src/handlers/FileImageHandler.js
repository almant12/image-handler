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
exports.FileImageHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const BaseImageHandler_1 = require("./BaseImageHandler");
const generateFilename_1 = require("../utils/generateFilename");
class FileImageHandler extends BaseImageHandler_1.BaseImageHandler {
    save(image, destinationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadsDir = this.resolveDestinationPath(destinationPath);
            const ext = path_1.default.extname(image.name);
            const filename = (0, generateFilename_1.generateFilename)(ext);
            const filePath = path_1.default.join(uploadsDir, filename);
            const arrayBuffer = yield image.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            fs_1.default.writeFileSync(filePath, buffer);
            return path_1.default.relative(path_1.default.join(process.cwd(), 'public'), filePath);
        });
    }
    /**
   * Saves multiple images to the destination path.
   * @param images An array of File objects to save.
   * @param destinationPath The path where the images will be saved.
   * @returns An array of relative file paths for the saved images.
   */
    saveMultiple(images, destinationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedPaths = [];
            for (const image of images) {
                const savedPath = yield this.save(image, destinationPath);
                savedPaths.push(savedPath);
            }
            return savedPaths;
        });
    }
    update(image, oldPath, destinationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.delete(oldPath);
            return this.save(image, destinationPath);
        });
    }
}
exports.FileImageHandler = FileImageHandler;
