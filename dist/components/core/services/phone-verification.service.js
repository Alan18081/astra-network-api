"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const authy_client_1 = require("authy-client");
const config_service_1 = require("./config.service");
let PhoneVerificationService = class PhoneVerificationService {
    constructor(configService) {
        this.configService = configService;
        this.authy = new authy_client_1.Client({ key: configService.get('AUTHY_PRODUCTION_KEY') });
    }
    sendVerificationSMS(authyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authy.requestSms({ authyId });
        });
    }
    registerAuthyUser(email, countryCode, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authy.registerUser({
                email,
                countryCode,
                phone
            });
        });
    }
    verifyPhoneCode(authyId, code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authy.verifyToken({ authyId, token: code });
                return true;
            }
            catch (e) {
                return false;
            }
        });
    }
};
PhoneVerificationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], PhoneVerificationService);
exports.PhoneVerificationService = PhoneVerificationService;
//# sourceMappingURL=phone-verification.service.js.map