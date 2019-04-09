"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const fs_1 = require("fs");
const path_1 = require("path");
class ConfigService {
    constructor(filePath) {
        this.envConfig = dotenv.parse(fs_1.readFileSync(filePath));
    }
    get(key) {
        return this.envConfig[key];
    }
    getFilesFolder() {
        return path_1.resolve(__dirname, '../../upload');
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map