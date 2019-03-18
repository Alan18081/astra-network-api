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
let FilesResolver = class FilesResolver {
    constructor(filesService) {
        this.filesService = filesService;
    }
    uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.filesService.uploadFile(file);
        });
    }
    uploadFilesList(files) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.filesService.uploadFilesList(files);
        });
    }
};
__decorate([
    graphql_1.Mutation('uploadFile'),
    common_1.UseInterceptors(common_1.FileInterceptor('file')),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesResolver.prototype, "uploadFile", null);
__decorate([
    graphql_1.Mutation('uploadFilesList'),
    common_1.UseInterceptors(common_1.FileInterceptor('files')),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FilesResolver.prototype, "uploadFilesList", null);
FilesResolver = __decorate([
    graphql_1.Resolver('File'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesResolver);
exports.FilesResolver = FilesResolver;
//# sourceMappingURL=files.resolver.js.map