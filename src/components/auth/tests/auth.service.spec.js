"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@nestjs/testing");
var jwt_1 = require("@nestjs/jwt");
var user_entity_1 = require("../../users/user.entity");
var users_service_1 = require("../../users/users.service");
var auth_service_1 = require("../auth.service");
var common_1 = require("@nestjs/common");
var messages_enum_1 = require("../../../helpers/enums/messages.enum");
var user_hashes_service_1 = require("../../user-hashes/user-hashes.service");
var refresh_tokens_service_1 = require("../../refresh-tokens/refresh-tokens.service");
var refresh_token_entity_1 = require("../../refresh-tokens/refresh-token.entity");
var core_module_1 = require("../../core/core.module");
var config_1 = require("../../../config");
var email_templates_service_1 = require("../../core/services/email-templates.service");
var email_sending_service_1 = require("../../core/services/email-sending.service");
var hash_types_enum_1 = require("../../../helpers/enums/hash-types.enum");
var template_types_enum_1 = require("../../../helpers/enums/template-types.enum");
var websockets_1 = require("@nestjs/websockets");
var user_hash_entity_1 = require("../../user-hashes/user-hash.entity");
var mockUsersService = {
    findOneByEmail: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    }
};
var mockJwtService = {
    sign: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    },
    decode: function () { },
};
var mockUserHashesService = {
    findOneByHash: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    },
    createOne: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    },
};
var mockRefreshTokensService = {
    findOneByToken: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    },
    findOneByUserId: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    },
    createOne: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    },
    deleteOne: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    },
};
var mockedEmailTemplatesService = {
    getTemplate: function () { },
    createSubject: function () { },
};
var mockedEmailSendingService = {
    sendSystemEmail: function () { }
};
var mockUser = __assign({}, new user_entity_1.User(), { firstName: 'Alan', lastName: 'Morgan', googleId: 12, email: 'test@gmail.com' });
var mockUserWithPassword = __assign({}, mockUser, { password: 'Some password' });
var mockRefreshToken = __assign({}, new refresh_token_entity_1.RefreshToken(), { token: 'Some token', userId: 6, id: 2 });
var mockUserHash = __assign({}, new user_hash_entity_1.UserHash(), { hash: 'My hash', userId: 5 });
describe('AuthService', function () {
    var authService;
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        imports: [core_module_1.CoreModule],
                        controllers: [],
                        providers: [auth_service_1.AuthService]
                    }).overrideProvider(users_service_1.UsersService)
                        .useValue(mockUsersService)
                        .overrideProvider(jwt_1.JwtService)
                        .useValue(mockJwtService)
                        .overrideProvider(user_hashes_service_1.UserHashesService)
                        .useValue(mockUserHashesService)
                        .overrideProvider(refresh_tokens_service_1.RefreshTokensService)
                        .useValue(mockRefreshTokensService)
                        .overrideProvider(email_templates_service_1.EmailTemplatesService)
                        .useValue(mockedEmailTemplatesService)
                        .overrideProvider(email_sending_service_1.EmailSendingService)
                        .useValue(mockedEmailSendingService)
                        .compile()];
                case 1:
                    module = _a.sent();
                    authService = module.get(auth_service_1.AuthService);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('singIn', function () {
        var jwtResponse = {
            accessToken: 'Access token',
            refreshToken: mockRefreshToken.token,
            expiresIn: config_1.JWT_EXPIRES
        };
        it('should call jwtService.sign', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spy = jest.spyOn(mockJwtService, 'sign');
                        spy.mockImplementation(function () { return jwtResponse.accessToken; });
                        jest.spyOn(mockRefreshTokensService, 'findOneByUserId').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, mockRefreshToken];
                        }); }); });
                        return [4 /*yield*/, authService.signIn(mockUserWithPassword)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return token\'s info if token exists', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jest.spyOn(mockJwtService, 'sign').mockImplementation(function () { return jwtResponse.accessToken; });
                        jest.spyOn(mockRefreshTokensService, 'findOneByUserId').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, mockRefreshToken];
                        }); }); });
                        _a = expect;
                        return [4 /*yield*/, authService.signIn(mockUserWithPassword)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toEqual(jwtResponse);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create new refresh token and return token\'s info if token is not found', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jest.spyOn(mockJwtService, 'sign').mockImplementation(function () { return jwtResponse.accessToken; });
                        jest.spyOn(mockRefreshTokensService, 'findOneByUserId').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, undefined];
                        }); }); });
                        spy = jest.spyOn(mockRefreshTokensService, 'createOne');
                        spy.mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, mockRefreshToken];
                        }); }); });
                        _a = expect;
                        return [4 /*yield*/, authService.signIn(mockUserWithPassword)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toEqual(jwtResponse);
                        expect(spy).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('verifyEmail', function () {
        it('should call userHashes.createOne with right arguments', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spy = jest.spyOn(mockUserHashesService, 'createOne');
                        spy.mockImplementation(function () { return mockUserWithPassword; });
                        return [4 /*yield*/, authService.verifyEmail(mockUserWithPassword)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalledWith(mockUserWithPassword.id, hash_types_enum_1.HashTypes.EMAIL_VERIFICATION);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call emailTemplatesService.getTemplate with right arguments', function () { return __awaiter(_this, void 0, void 0, function () {
            var template, spy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        template = 'template';
                        jest.spyOn(mockUserHashesService, 'createOne').mockImplementation(function () { return mockUserHash; });
                        spy = jest.spyOn(mockedEmailTemplatesService, 'getTemplate');
                        spy.mockImplementation(function () { return template; });
                        return [4 /*yield*/, authService.verifyEmail(mockUserWithPassword)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalledWith(template_types_enum_1.TemplateTypes.EMAIL_VERIFICATION, {
                            firstName: mockUserWithPassword.firstName,
                            lastName: mockUserWithPassword.lastName,
                            url: "http://" + config_1.HOST + ":" + config_1.PORT + "/auth/verifyEmail/hash/" + mockUserHash.hash
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call emailSendingService.sendSystemEmail with right arguments', function () { return __awaiter(_this, void 0, void 0, function () {
            var template, subject, spy;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        template = 'template';
                        subject = 'Subject';
                        jest.spyOn(mockUserHashesService, 'createOne').mockImplementation(function () { return true; });
                        jest.spyOn(mockedEmailTemplatesService, 'getTemplate').mockImplementation(function () { return template; });
                        jest.spyOn(mockedEmailTemplatesService, 'createSubject').mockImplementation(function () { return subject; });
                        spy = jest.spyOn(mockedEmailSendingService, 'sendSystemEmail').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/];
                        }); }); });
                        return [4 /*yield*/, authService.verifyEmail(mockUserWithPassword)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalledWith(mockUserWithPassword.email, subject, template);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if user doesn\'t exist', function () { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(function () { return undefined; });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, authService.verifyEmail(mockUserWithPassword)];
                    case 2:
                        _a.sent();
                        expect(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(JSON.stringify(e_1)).toEqual(JSON.stringify(new common_1.NotFoundException(messages_enum_1.Messages.USER_NOT_FOUND)));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('resetPassword', function () {
        it('should call userHashes.createOne with right arguments', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spy = jest.spyOn(mockUserHashesService, 'createOne');
                        spy.mockImplementation(function () { return mockUserWithPassword; });
                        return [4 /*yield*/, authService.resetPassword(mockUserWithPassword)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalledWith(mockUserWithPassword.id, hash_types_enum_1.HashTypes.RESET_PASSWORD);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call emailTemplatesService.getTemplate with right arguments', function () { return __awaiter(_this, void 0, void 0, function () {
            var template, spy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        template = 'template';
                        jest.spyOn(mockUserHashesService, 'createOne').mockImplementation(function () { return mockUserHash; });
                        spy = jest.spyOn(mockedEmailTemplatesService, 'getTemplate');
                        spy.mockImplementation(function () { return template; });
                        return [4 /*yield*/, authService.resetPassword(mockUserWithPassword)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalledWith(template_types_enum_1.TemplateTypes.RESET_PASSWORD, {
                            firstName: mockUserWithPassword.firstName,
                            lastName: mockUserWithPassword.lastName,
                            url: "http://" + config_1.HOST + ":" + config_1.PORT + "/auth/resetPassword/hash/" + mockUserHash.hash
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call emailSendingService.sendSystemEmail with right arguments', function () { return __awaiter(_this, void 0, void 0, function () {
            var template, subject, spy;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        template = 'template';
                        subject = 'Subject';
                        jest.spyOn(mockUserHashesService, 'createOne').mockImplementation(function () { return mockUserHash; });
                        jest.spyOn(mockedEmailTemplatesService, 'getTemplate').mockImplementation(function () { return template; });
                        jest.spyOn(mockedEmailTemplatesService, 'createSubject').mockImplementation(function () { return subject; });
                        spy = jest.spyOn(mockedEmailSendingService, 'sendSystemEmail').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/];
                        }); }); });
                        return [4 /*yield*/, authService.resetPassword(mockUserWithPassword)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalledWith(mockUserWithPassword.email, subject, template);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if user doesn\'t exist', function () { return __awaiter(_this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(function () { return undefined; });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, authService.resetPassword(mockUserWithPassword)];
                    case 2:
                        _a.sent();
                        expect(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        expect(JSON.stringify(e_2)).toEqual(JSON.stringify(new common_1.NotFoundException(messages_enum_1.Messages.USER_NOT_FOUND)));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('exchangeToken', function () {
        var refreshToken = 'some token';
        it('should call authService.singIn and refreshTokensService.deleteOne if token is found', function () { return __awaiter(_this, void 0, void 0, function () {
            var signInSpy, deleteOneSpy, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jest.spyOn(mockRefreshTokensService, 'findOneByToken').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, mockRefreshToken];
                        }); }); });
                        signInSpy = jest.spyOn(authService, 'signIn');
                        signInSpy.mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, true];
                        }); }); });
                        deleteOneSpy = jest.spyOn(mockRefreshTokensService, 'deleteOne');
                        deleteOneSpy.mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/];
                        }); }); });
                        _a = expect;
                        return [4 /*yield*/, authService.exchangeToken(refreshToken)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toBe(true);
                        expect(signInSpy).toBeCalled();
                        expect(deleteOneSpy).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if token is not found', function () { return __awaiter(_this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(mockRefreshTokensService, 'findOneByToken').mockImplementation(function () { return undefined; });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, authService.exchangeToken(refreshToken)];
                    case 2:
                        _a.sent();
                        expect(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        expect(JSON.stringify(e_3)).toEqual(JSON.stringify(new common_1.NotFoundException(messages_enum_1.Messages.REFRESH_TOKEN_NOT_FOUND)));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('setNewPassword', function () {
        var payload = {
            hash: 'Some hash',
            password: '123456'
        };
        it('should throw an error if hash is not found', function () { return __awaiter(_this, void 0, void 0, function () {
            var e_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(mockUserHashesService, 'findOneByHash').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, undefined];
                        }); }); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, authService.setNewPassword(payload)];
                    case 2:
                        _a.sent();
                        expect(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        expect(JSON.stringify(e_4)).toEqual(JSON.stringify(new common_1.NotFoundException(messages_enum_1.Messages.RESET_PASSWORD_HASH_NOT_FOUND)));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('decodeToken', function () {
        var token = 'Some token';
        it('should return decoded token', function () { return __awaiter(_this, void 0, void 0, function () {
            var tokenData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        tokenData = {};
                        jest.spyOn(mockJwtService, 'decode').mockImplementation(function () { return tokenData; });
                        _a = expect;
                        return [4 /*yield*/, authService.decodeToken(token)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toBe(tokenData);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if token data is empty', function () { return __awaiter(_this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(mockJwtService, 'decode').mockImplementation(function () { return undefined; });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, authService.decodeToken(token)];
                    case 2:
                        _a.sent();
                        expect(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        expect(JSON.stringify(e_5)).toEqual(JSON.stringify(new websockets_1.WsException(messages_enum_1.Messages.INVALID_TOKEN)));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
});
