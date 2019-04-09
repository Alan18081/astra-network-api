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
var auth_controller_1 = require("../auth.controller");
var auth_service_1 = require("../auth.service");
var users_service_1 = require("../../users/users.service");
var user_entity_1 = require("../../users/user.entity");
var hash_service_1 = require("../../core/services/hash.service");
var common_1 = require("@nestjs/common");
var messages_enum_1 = require("../../../helpers/enums/messages.enum");
describe('AuthController', function () {
    var authController, authService;
    var mockUsersService = {
        findOneByEmail: function () { }
    };
    var mockAuthService = {
        signIn: function () {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        },
        resetPassword: function () {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        },
        exchangeToken: function () {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        },
        setNewPassword: function () {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        },
    };
    var mockHashService = {
        compareHash: function () {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        }
    };
    var mockUser = __assign({}, new user_entity_1.User(), { firstName: 'Alan', lastName: 'Morgan', googleId: 12, email: 'test@gmail.com' });
    var mockUserWithPassword = __assign({}, mockUser, { password: 'Some password' });
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        controllers: [auth_controller_1.AuthController],
                    }).overrideProvider(users_service_1.UsersService)
                        .useValue(mockUsersService)
                        .overrideProvider(auth_service_1.AuthService)
                        .useValue(mockAuthService)
                        .overrideProvider(hash_service_1.HashService)
                        .useValue(mockHashService)
                        .compile()];
                case 1:
                    module = _a.sent();
                    authController = module.get(auth_controller_1.AuthController);
                    authService = module.get(auth_service_1.AuthService);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('login', function () {
        var payload = {
            email: 'test@gmail.com',
            password: '123456',
        };
        var jwtResponse = {
            accessToken: 'Access token',
            refreshToken: 'Refresh token',
            expiresIn: 4500
        };
        beforeEach(function () {
            jest.spyOn(mockAuthService, 'signIn').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, jwtResponse];
            }); }); });
        });
        it('should return token\'s info if credentials valid and user is found', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(function () { return mockUserWithPassword; });
                        jest.spyOn(mockHashService, 'compareHash').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, true];
                        }); }); });
                        _a = expect;
                        return [4 /*yield*/, authController.login(payload)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toEqual(jwtResponse);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call usersService.findOneByEmail', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spy = jest.spyOn(mockUsersService, 'findOneByEmail');
                        spy.mockImplementation(function () { return mockUserWithPassword; });
                        return [4 /*yield*/, authController.login(payload)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call authService.signIn', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(function () { return mockUserWithPassword; });
                        spy = jest.spyOn(authService, 'signIn').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, true];
                        }); }); });
                        return [4 /*yield*/, authController.login(payload)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if user is not found', function () { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(function () { return undefined; });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, authController.login(payload)];
                    case 2:
                        _a.sent();
                        expect(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(JSON.stringify(e_1)).toEqual(JSON.stringify(new common_1.UnauthorizedException(messages_enum_1.Messages.USER_NOT_FOUND)));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if user doesn\'t have password', function () { return __awaiter(_this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(function () { return mockUser; });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, authController.login(payload)];
                    case 2:
                        _a.sent();
                        expect(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        expect(JSON.stringify(e_2)).toEqual(JSON.stringify(new common_1.BadRequestException(messages_enum_1.Messages.USER_DOESNT_HAVE_PASSWORD)));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if user has provided invalid password', function () { return __awaiter(_this, void 0, void 0, function () {
            var e_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(function () { return mockUserWithPassword; });
                        jest.spyOn(mockHashService, 'compareHash').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, false];
                        }); }); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, authController.login(payload)];
                    case 2:
                        _a.sent();
                        expect(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        expect(JSON.stringify(e_3)).toEqual(JSON.stringify(new common_1.UnauthorizedException(messages_enum_1.Messages.INVALID_PASSWORD)));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('resetPassword', function () {
        var payload = {
            email: 'test@gmail.com',
        };
        it('should call usersService.findOneByEmail', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spy = jest.spyOn(mockUsersService, 'findOneByEmail');
                        spy.mockImplementation(function () { return mockUsersService; });
                        return [4 /*yield*/, authController.resetPassword(payload)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call authService.resetPassword', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(function () { return mockUserWithPassword; });
                        spy = jest.spyOn(authService, 'resetPassword').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, true];
                        }); }); });
                        return [4 /*yield*/, authController.resetPassword(payload)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if user doesn\'t exist', function () { return __awaiter(_this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(function () { return undefined; });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, authController.resetPassword(payload)];
                    case 2:
                        _a.sent();
                        expect(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        expect(JSON.stringify(e_4)).toEqual(JSON.stringify(new common_1.NotFoundException(messages_enum_1.Messages.USER_NOT_FOUND)));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('exchangeToken', function () {
        var payload = {
            refreshToken: 'some token'
        };
        it('should call authService.exchangeToken', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spy = jest.spyOn(authService, 'exchangeToken').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, true];
                        }); }); });
                        return [4 /*yield*/, authController.exchangeToken(payload)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('googleLoginCallback', function () {
        var user = {
            id: 5
        };
        var res = {
            redirect: function () { }
        };
        var spy = jest.spyOn(res, 'redirect');
        it('should redirect to success route if user has been found', function () {
            authController.googleLoginCallback(user, res);
            expect(spy).toBeCalledWith("/auth/google/success?userId=" + user.id);
        });
        it('should redirect to fail route if user has not been found', function () {
            authController.googleLoginCallback(null, res);
            expect(spy).toBeCalledWith('/auth/google/fail');
        });
    });
    describe('setNewPassword', function () {
        var payload = {
            hash: 'Some hash',
            password: '123456'
        };
        it('should call authService.setNewPassword', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spy = jest.spyOn(authService, 'setNewPassword').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, true];
                        }); }); });
                        return [4 /*yield*/, authController.setNewPassword(payload)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
