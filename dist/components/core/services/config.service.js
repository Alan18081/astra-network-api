"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const fs_1 = require("fs");
class ConfigService {
    constructor(filePath) {
        this.envConfig = dotenv.parse(fs_1.readFileSync(filePath));
    }
    get(key) {
        return this.envConfig[key];
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map