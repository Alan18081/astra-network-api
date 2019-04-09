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
const users_service_1 = require("../../users/users.service");
const user_decorator_1 = require("../../../helpers/decorators/user.decorator");
const add_comment_dto_1 = require("../dto/add-comment.dto");
const notes_service_1 = require("../notes.service");
const remove_comment_dto_1 = require("../dto/remove-comment.dto");
let CommentsResolver = class CommentsResolver {
    constructor(usersService, notesService) {
        this.usersService = usersService;
        this.notesService = notesService;
    }
    author(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.findOne(comment.author);
        });
    }
    addComment(user, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.notesService.addComment(user._id, dto);
        });
    }
    removeComment(user, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.notesService.removeComment(user._id, dto);
        });
    }
};
__decorate([
    graphql_1.ResolveProperty('author'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentsResolver.prototype, "author", null);
__decorate([
    graphql_1.Mutation('addComment'),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_comment_dto_1.AddCommentDto]),
    __metadata("design:returntype", Promise)
], CommentsResolver.prototype, "addComment", null);
__decorate([
    graphql_1.Mutation('removeComment'),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, remove_comment_dto_1.RemoveCommentDto]),
    __metadata("design:returntype", Promise)
], CommentsResolver.prototype, "removeComment", null);
CommentsResolver = __decorate([
    graphql_1.Resolver('Comment'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        notes_service_1.NotesService])
], CommentsResolver);
exports.CommentsResolver = CommentsResolver;
//# sourceMappingURL=comments.resolver.js.map