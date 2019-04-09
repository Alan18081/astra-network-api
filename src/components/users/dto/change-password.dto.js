"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var config_service_1 = require("../../core/services/config.service");
var configService = new config_service_1.ConfigService(process.env.NODE_ENV + ".env");
var ChangePasswordDto = /** @class */ (function () {
    function ChangePasswordDto() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(+configService.get('PASSWORD_LENGTH'))
    ], ChangePasswordDto.prototype, "oldPassword", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(+configService.get('PASSWORD_LENGTH'))
    ], ChangePasswordDto.prototype, "newPassword", void 0);
    return ChangePasswordDto;
}());
exports.ChangePasswordDto = ChangePasswordDto;
