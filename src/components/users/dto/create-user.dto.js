"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var config_service_1 = require("../../core/services/config.service");
var configService = new config_service_1.ConfigService(process.env.NODE_ENV + ".env");
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    __decorate([
        class_validator_1.IsString(),
        swagger_1.ApiModelProperty()
    ], CreateUserDto.prototype, "firstName", void 0);
    __decorate([
        class_validator_1.IsString(),
        swagger_1.ApiModelProperty()
    ], CreateUserDto.prototype, "lastName", void 0);
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.IsOptional(),
        swagger_1.ApiModelProperty()
    ], CreateUserDto.prototype, "age", void 0);
    __decorate([
        class_validator_1.IsEmail(),
        swagger_1.ApiModelProperty()
    ], CreateUserDto.prototype, "email", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(+configService.get('PASSWORD_LENGTH')),
        swagger_1.ApiModelProperty()
    ], CreateUserDto.prototype, "password", void 0);
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;
