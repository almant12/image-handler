"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFilename = generateFilename;
const uuid_1 = require("uuid");
function generateFilename(extension) {
    return `${(0, uuid_1.v4)()}${extension}`;
}
