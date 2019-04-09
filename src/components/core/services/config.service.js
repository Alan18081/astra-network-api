"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var fs_1 = require("fs");
var path_1 = require("path");
var ConfigService = /** @class */ (function () {
    function ConfigService(filePath) {
        this.envConfig = dotenv.parse(fs_1.readFileSync(filePath));
    }
    ConfigService.prototype.get = function (key) {
        return this.envConfig[key];
    };
    ConfigService.prototype.getFilesFolder = function () {
        return path_1.resolve(__dirname, '../../upload');
    };
    return ConfigService;
}());
exports.ConfigService = ConfigService;
