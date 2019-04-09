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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("../../auth/auth.service");
const login_dto_1 = require("../../auth/dto/login.dto");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../../helpers/guards/auth.guard");
const user_decorator_1 = require("../../../helpers/decorators/user.decorator");
const send_phone_verification_code_dto_1 = require("../../auth/dto/send-phone-verification-code.dto");
const verify_phone_verification_code_dto_1 = require("../../auth/dto/verify-phone-verification-code.dto");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    login(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.login(loginDto);
        });
    }
    exchangeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.exchangeToken(token);
        });
    }
    sendPhoneVerificationCode(user, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.sendPhoneVerificationCode(user, dto);
        });
    }
    verifyPhoneVerificationCode(user, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.verifyPhoneVerificationCode(user, dto.code);
        });
    }
};
__decorate([
    graphql_1.Mutation('login'),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    graphql_1.Mutation('exchangeToken'),
    __param(0, graphql_1.Args('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "exchangeToken", null);
__decorate([
    graphql_1.Mutation('sendPhoneVerificationCode'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, send_phone_verification_code_dto_1.SendPhoneVerificationCodeDto]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "sendPhoneVerificationCode", null);
__decorate([
    graphql_1.Mutation('verifyPhoneVerificationCode'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, verify_phone_verification_code_dto_1.VerifyPhoneVerificationCodeDto]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "verifyPhoneVerificationCode", null);
AuthResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map