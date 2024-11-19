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
exports.BaseImageHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ensureDirectory_1 = require("../utils/ensureDirectory");
class BaseImageHandler {
    constructor() {
        this.defaultUploadsDir = path_1.default.join(process.cwd(), 'public');
        (0, ensureDirectory_1.ensureDirectory)(this.defaultUploadsDir);
    }
    resolveDestinationPath(destinationPath) {
        const resolvedPath = 'public/' + destinationPath || this.defaultUploadsDir;
        (0, ensureDirectory_1.ensureDirectory)(resolvedPath);
        return resolvedPath;
    }
    delete(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.join(process.cwd(), filePath);
            if (fs_1.default.existsSync(absolutePath)) {
                fs_1.default.unlinkSync(absolutePath);
            }
        });
    }
}
exports.BaseImageHandler = BaseImageHandler;
