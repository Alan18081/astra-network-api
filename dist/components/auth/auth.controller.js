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
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("./dto/login.dto");
const users_service_1 = require("../users/users.service");
const messages_enum_1 = require("../../helpers/enums/messages.enum");
const auth_service_1 = require("./auth.service");
const hash_service_1 = require("../core/services/hash.service");
const exchangeToken_dto_1 = require("./dto/exchangeToken.dto");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("../../helpers/decorators/user.decorator");
const user_entity_1 = require("../users/user.entity");
const change_password_dto_1 = require("./dto/change-password.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const set_new_password_dto_1 = require("./dto/set-new-password.dto");
let AuthController = class AuthController {
    constructor(usersService, hashService, authService) {
        this.usersService = usersService;
        this.hashService = hashService;
        this.authService = authService;
    }
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOneByEmail(payload.email);
            if (!user) {
                throw new common_1.UnauthorizedException(messages_enum_1.Messages.USER_NOT_FOUND);
            }
            if (!user.password) {
                throw new common_1.BadRequestException(messages_enum_1.Messages.USER_DOESNT_HAVE_PASSWORD);
            }
            const isValidPassword = yield this.hashService.compareHash(payload.password, user.password);
            if (!isValidPassword) {
                throw new common_1.UnauthorizedException(messages_enum_1.Messages.INVALID_PASSWORD);
            }
            return yield this.authService.signIn(user);
        });
    }
    exchangeToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.exchangeToken(payload.refreshToken);
        });
    }
    googleLogin() { }
    googleLoginCallback(user, res) {
        if (user) {
            res.redirect(`/auth/google/success?userId=${user.id}`);
        }
        else {
            res.redirect('/auth/google/fail');
        }
    }
    googleSuccess(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOne(+userId);
            if (user) {
                return yield this.authService.signIn(user);
            }
        });
    }
    googleFail() {
        return __awaiter(this, void 0, void 0, function* () {
            return new common_1.UnauthorizedException(messages_enum_1.Messages.FAILED_GOOGLE_AUTH);
        });
    }
    changePassword(user, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.password) {
                throw new common_1.BadRequestException(messages_enum_1.Messages.USER_DOESNT_HAVE_PASSWORD);
            }
            const isValid = yield this.hashService.compareHash(payload.oldPassword, user.password);
            if (!isValid) {
                throw new common_1.BadRequestException(messages_enum_1.Messages.INVALID_PASSWORD);
            }
            const newPassword = yield this.hashService.generateHash(payload.newPassword);
            yield this.usersService.updateOne(user.id, { password: newPassword });
        });
    }
    verifyEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authService.verifyEmail(user);
        });
    }
    verifyEmailHash(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(hash);
        });
    }
    resetPassword(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOneByEmail(body.email);
            if (!user) {
                throw new common_1.NotFoundException(messages_enum_1.Messages.USER_NOT_FOUND);
            }
            yield this.authService.resetPassword(user);
        });
    }
    setNewPassword(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authService.setNewPassword(body);
        });
    }
};
__decorate([
    common_1.Post('login'),
    swagger_1.ApiOperation({ title: 'Login for generating access token' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('token'),
    swagger_1.ApiOperation({ title: 'Exchange refresh token for new access token' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exchangeToken_dto_1.ExchangeTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "exchangeToken", null);
__decorate([
    common_1.Get('google'),
    common_1.UseGuards(passport_1.AuthGuard('google')),
    swagger_1.ApiOperation({ title: 'Login via google' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleLogin", null);
__decorate([
    common_1.Get('google/callback'),
    common_1.UseGuards(passport_1.AuthGuard('google')),
    swagger_1.ApiOperation({ title: 'Callback for google authentication' }),
    __param(0, user_decorator_1.ReqUser()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleLoginCallback", null);
__decorate([
    common_1.Get('google/success'),
    swagger_1.ApiOperation({ title: 'Google success authentication' }),
    __param(0, common_1.Query('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleSuccess", null);
__decorate([
    common_1.Get('google/fail'),
    swagger_1.ApiOperation({ title: 'Google failed authentication' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleFail", null);
__decorate([
    common_1.Put('changePassword'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ title: 'Create new password' }),
    __param(0, user_decorator_1.ReqUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    common_1.Get('verifyEmail'),
    common_1.HttpCode(common_1.HttpStatus.ACCEPTED),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ title: 'Verify your email' }),
    __param(0, user_decorator_1.ReqUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    common_1.Get('verifyEmail/hash/:hash'),
    common_1.HttpCode(common_1.HttpStatus.ACCEPTED),
    swagger_1.ApiOperation({ title: 'Route to which you will be redirected when click btn in your email' }),
    __param(0, common_1.Param('hash')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmailHash", null);
__decorate([
    common_1.Post('resetPassword'),
    common_1.HttpCode(common_1.HttpStatus.ACCEPTED),
    swagger_1.ApiOperation({ title: 'Reset password' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    common_1.Post('newPassword'),
    common_1.HttpCode(common_1.HttpStatus.ACCEPTED),
    swagger_1.ApiOperation({ title: 'Set new password' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_new_password_dto_1.SetNewPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setNewPassword", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    swagger_1.ApiUseTags('Auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        hash_service_1.HashService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map