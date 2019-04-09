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
const common_1 = require("@nestjs/common");
const files_service_1 = require("../../files/files.service");
const auth_guard_1 = require("../../../helpers/guards/auth.guard");
const users_service_1 = require("../../users/users.service");
const user_decorator_1 = require("../../../helpers/decorators/user.decorator");
let FilesResolver = class FilesResolver {
    constructor(filesService, usersService) {
        this.filesService = filesService;
        this.usersService = usersService;
    }
    user(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.findOne(file.user);
        });
    }
    uploadFile(user, someFile) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.filesService.uploadFile(someFile, user._id);
        });
    }
    uploadFilesList(user, files) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.filesService.uploadFilesList(files, user._id);
        });
    }
};
__decorate([
    graphql_1.ResolveProperty('user'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesResolver.prototype, "user", null);
__decorate([
    graphql_1.Mutation('uploadFile'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FilesResolver.prototype, "uploadFile", null);
__decorate([
    graphql_1.Mutation('uploadFilesList'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('files')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], FilesResolver.prototype, "uploadFilesList", null);
FilesResolver = __decorate([
    graphql_1.Resolver('File'),
    __metadata("design:paramtypes", [files_service_1.FilesService,
        users_service_1.UsersService])
], FilesResolver);
exports.FilesResolver = FilesResolver;
//# sourceMappingURL=files.resolver.js.map