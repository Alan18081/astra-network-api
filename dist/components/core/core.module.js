"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const hash_service_1 = require("./services/hash.service");
const date_scalar_1 = require("./scalars/date.scalar");
const publisher_service_1 = require("./services/publisher.service");
const phone_verification_service_1 = require("./services/phone-verification.service");
const config_service_1 = require("./services/config.service");
const exportedProviders = [
    hash_service_1.HashService,
    date_scalar_1.DateScalar,
    publisher_service_1.PublisherService,
    phone_verification_service_1.PhoneVerificationService,
    {
        provide: config_service_1.ConfigService,
        useValue: new config_service_1.ConfigService(`${process.env.NODE_ENV}.env`),
    },
];
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    common_1.Module({
        imports: [],
        exports: [...exportedProviders],
        controllers: [],
        providers: [...exportedProviders],
    })
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map