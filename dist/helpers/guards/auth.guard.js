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
const graphql_1 = require("@nestjs/graphql");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../../components/auth/auth.service");
const messages_enum_1 = require("../enums/messages.enum");
let GqlAuthGuard = class GqlAuthGuard {
    constructor(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const ctx = graphql_1.GqlExecutionContext.create(context);
            const { req } = ctx.getContext();
            const { authorization } = req.headers;
            if (!authorization) {
                throw new common_1.UnauthorizedException(messages_enum_1.Messages.INVALID_TOKEN);
            }
            const token = authorization.split(' ')[1];
            const payload = this.jwtService.verify(token);
            if (!payload) {
                throw new common_1.UnauthorizedException(messages_enum_1.Messages.INVALID_TOKEN);
            }
            ctx.getContext().user = yield this.authService.validateUser(payload);
            return true;
        });
    }
};
GqlAuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService])
], GqlAuthGuard);
exports.GqlAuthGuard = GqlAuthGuard;
//# sourceMappingURL=auth.guard.js.map