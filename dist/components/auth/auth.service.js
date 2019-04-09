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
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const messages_enum_1 = require("../../helpers/enums/messages.enum");
const refresh_tokens_service_1 = require("../refresh-tokens/refresh-tokens.service");
const hash_service_1 = require("../core/services/hash.service");
const phone_verification_service_1 = require("../core/services/phone-verification.service");
const config_service_1 = require("../core/services/config.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, hashService, refreshTokensService, phoneVerificationService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.hashService = hashService;
        this.refreshTokensService = refreshTokensService;
        this.phoneVerificationService = phoneVerificationService;
        this.configService = configService;
    }
    login(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOneByEmail(loginDto.email);
            if (!user) {
                throw new common_1.UnauthorizedException(messages_enum_1.Messages.USER_NOT_FOUND);
            }
            if (!user.password) {
                throw new common_1.BadRequestException(messages_enum_1.Messages.USER_DOESNT_HAVE_PASSWORD);
            }
            const isValidPassword = yield this.hashService.compareHash(loginDto.password, user.password);
            if (!isValidPassword) {
                throw new common_1.UnauthorizedException(messages_enum_1.Messages.INVALID_PASSWORD);
            }
            return this.signIn(user);
        });
    }
    signIn(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwtPayload = { email: user.email, id: user.id };
            const accessToken = this.jwtService.sign(jwtPayload);
            const refreshTokenRecord = yield this.refreshTokensService.findOneByUserId(user.id);
            if (refreshTokenRecord) {
                return {
                    accessToken,
                    refreshToken: refreshTokenRecord.token,
                    expiresIn: +this.configService.get('JWT_EXPIRES'),
                };
            }
            const newRefreshTokenRecord = yield this.refreshTokensService.createOne({
                userId: user.id,
                accessToken
            });
            return {
                accessToken,
                refreshToken: newRefreshTokenRecord.token,
                expiresIn: +this.configService.get('JWT_EXPIRES'),
            };
        });
    }
    validateUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Jwt payload', payload);
            return this.usersService.findOneByEmail(payload.email);
        });
    }
    exchangeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenRecord = yield this.refreshTokensService.findOneByToken(token);
            if (!tokenRecord) {
                throw new common_1.NotFoundException(messages_enum_1.Messages.REFRESH_TOKEN_NOT_FOUND);
            }
            const [user] = yield Promise.all([
                this.usersService.findOne(tokenRecord.user),
                this.refreshTokensService.deleteOne(tokenRecord.id),
            ]);
            return yield this.signIn(user);
        });
    }
    sendPhoneVerificationCode(user, { countryCode, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.phoneVerified) {
                throw new common_1.ConflictException(messages_enum_1.Messages.PHONE_HAVE_ALREADY_BEEN_VERIFIED);
            }
            if (!user.authyId) {
                const authyId = yield this.phoneVerificationService.registerAuthyUser(user.email, countryCode, phone);
                const updatedUser = yield this.usersService.setAuthyId(user._id, authyId);
                if (updatedUser) {
                    yield this.phoneVerificationService.sendVerificationSMS(authyId);
                }
                return updatedUser;
            }
            yield this.phoneVerificationService.sendVerificationSMS(user.authyId);
            return user;
        });
    }
    verifyPhoneVerificationCode(user, code) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.phoneVerified) {
                throw new common_1.ConflictException(messages_enum_1.Messages.PHONE_HAVE_ALREADY_BEEN_VERIFIED);
            }
            if (!user.authyId) {
                throw new common_1.BadRequestException(messages_enum_1.Messages.REQUIRES_TO_SEND_VERIFICATION_CODE_FIRST);
            }
            const isVerified = yield this.phoneVerificationService.verifyPhoneCode(user.authyId, code);
            if (!isVerified) {
                throw new common_1.BadRequestException(messages_enum_1.Messages.INVALID_PHONE_VERIFICATION_CODE);
            }
            return this.usersService.setPhoneVerified(user._id);
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        hash_service_1.HashService,
        refresh_tokens_service_1.RefreshTokensService,
        phone_verification_service_1.PhoneVerificationService,
        config_service_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map