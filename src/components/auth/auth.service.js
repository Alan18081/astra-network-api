"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var messages_enum_1 = require("../../helpers/enums/messages.enum");
var AuthService = /** @class */ (function () {
    function AuthService(usersService, jwtService, hashService, refreshTokensService, phoneVerificationService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.hashService = hashService;
        this.refreshTokensService = refreshTokensService;
        this.phoneVerificationService = phoneVerificationService;
        this.configService = configService;
    }
    AuthService.prototype.login = function (loginDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isValidPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.findOneByEmail(loginDto.email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.UnauthorizedException(messages_enum_1.Messages.USER_NOT_FOUND);
                        }
                        if (!user.password) {
                            throw new common_1.BadRequestException(messages_enum_1.Messages.USER_DOESNT_HAVE_PASSWORD);
                        }
                        return [4 /*yield*/, this.hashService.compareHash(loginDto.password, user.password)];
                    case 2:
                        isValidPassword = _a.sent();
                        if (!isValidPassword) {
                            throw new common_1.UnauthorizedException(messages_enum_1.Messages.INVALID_PASSWORD);
                        }
                        return [2 /*return*/, this.signIn(user)];
                }
            });
        });
    };
    AuthService.prototype.signIn = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var jwtPayload, accessToken, refreshTokenRecord, newRefreshTokenRecord;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jwtPayload = { email: user.email, id: user.id };
                        accessToken = this.jwtService.sign(jwtPayload);
                        return [4 /*yield*/, this.refreshTokensService.findOneByUserId(user.id)];
                    case 1:
                        refreshTokenRecord = _a.sent();
                        if (refreshTokenRecord) {
                            return [2 /*return*/, {
                                    accessToken: accessToken,
                                    refreshToken: refreshTokenRecord.token,
                                    expiresIn: +this.configService.get('JWT_EXPIRES'),
                                }];
                        }
                        return [4 /*yield*/, this.refreshTokensService.createOne({
                                userId: user.id,
                                accessToken: accessToken
                            })];
                    case 2:
                        newRefreshTokenRecord = _a.sent();
                        return [2 /*return*/, {
                                accessToken: accessToken,
                                refreshToken: newRefreshTokenRecord.token,
                                expiresIn: +this.configService.get('JWT_EXPIRES'),
                            }];
                }
            });
        });
    };
    AuthService.prototype.validateUser = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('Jwt payload', payload);
                return [2 /*return*/, this.usersService.findOneByEmail(payload.email)];
            });
        });
    };
    AuthService.prototype.exchangeToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenRecord, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.refreshTokensService.findOneByToken(token)];
                    case 1:
                        tokenRecord = _a.sent();
                        if (!tokenRecord) {
                            throw new common_1.NotFoundException(messages_enum_1.Messages.REFRESH_TOKEN_NOT_FOUND);
                        }
                        return [4 /*yield*/, Promise.all([
                                this.usersService.findOne(tokenRecord.user),
                                this.refreshTokensService.deleteOne(tokenRecord.id),
                            ])];
                    case 2:
                        user = (_a.sent())[0];
                        return [4 /*yield*/, this.signIn(user)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.sendPhoneVerificationCode = function (user, _a) {
        var countryCode = _a.countryCode, phone = _a.phone;
        return __awaiter(this, void 0, void 0, function () {
            var authyId, updatedUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (user.phoneVerified) {
                            throw new common_1.ConflictException(messages_enum_1.Messages.PHONE_HAVE_ALREADY_BEEN_VERIFIED);
                        }
                        if (!!user.authyId) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.phoneVerificationService.registerAuthyUser(user.email, countryCode, phone)];
                    case 1:
                        authyId = _b.sent();
                        return [4 /*yield*/, this.usersService.setAuthyId(user._id, authyId)];
                    case 2:
                        updatedUser = _b.sent();
                        if (!updatedUser) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.phoneVerificationService.sendVerificationSMS(authyId)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, updatedUser];
                    case 5: return [4 /*yield*/, this.phoneVerificationService.sendVerificationSMS(user.authyId)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthService.prototype.verifyPhoneVerificationCode = function (user, code) {
        return __awaiter(this, void 0, void 0, function () {
            var isVerified;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (user.phoneVerified) {
                            throw new common_1.ConflictException(messages_enum_1.Messages.PHONE_HAVE_ALREADY_BEEN_VERIFIED);
                        }
                        if (!user.authyId) {
                            throw new common_1.BadRequestException(messages_enum_1.Messages.REQUIRES_TO_SEND_VERIFICATION_CODE_FIRST);
                        }
                        return [4 /*yield*/, this.phoneVerificationService.verifyPhoneCode(user.authyId, code)];
                    case 1:
                        isVerified = _a.sent();
                        if (!isVerified) {
                            throw new common_1.BadRequestException(messages_enum_1.Messages.INVALID_PHONE_VERIFICATION_CODE);
                        }
                        return [2 /*return*/, this.usersService.setPhoneVerified(user._id)];
                }
            });
        });
    };
    AuthService = __decorate([
        common_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
