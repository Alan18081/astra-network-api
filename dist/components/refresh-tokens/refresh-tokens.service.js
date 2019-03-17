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
const refresh_tokens_repository_1 = require("./refresh-tokens.repository");
let RefreshTokensService = class RefreshTokensService {
    constructor(refreshTokensRepository, jwtService) {
        this.refreshTokensRepository = refreshTokensRepository;
        this.jwtService = jwtService;
    }
    findOneByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.refreshTokensRepository.findOneByUserId(userId);
        });
    }
    findOneByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.refreshTokensRepository.findOneByToken(token);
        });
    }
    createOne(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accessToken, userId } = payload;
            const token = this.jwtService.sign({ accessToken, userId });
            const refreshToken = {};
            refreshToken.token = token;
            refreshToken.user = userId;
            return yield this.refreshTokensRepository.save(refreshToken);
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshTokensRepository.deleteById(id);
        });
    }
};
RefreshTokensService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [refresh_tokens_repository_1.RefreshTokensRepository,
        jwt_1.JwtService])
], RefreshTokensService);
exports.RefreshTokensService = RefreshTokensService;
//# sourceMappingURL=refresh-tokens.service.js.map