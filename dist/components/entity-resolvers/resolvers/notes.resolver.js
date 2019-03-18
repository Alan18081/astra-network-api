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
const notes_service_1 = require("../../notes/notes.service");
const find_notes_list_dto_1 = require("../../notes/dto/find-notes-list.dto");
const create_note_dto_1 = require("../../notes/dto/create-note.dto");
const user_decorator_1 = require("../../../helpers/decorators/user.decorator");
const update_note_dto_1 = require("../../notes/dto/update-note.dto");
const auth_guard_1 = require("../../../helpers/guards/auth.guard");
const users_service_1 = require("../../users/users.service");
const events_enum_1 = require("../../../helpers/enums/events.enum");
const publisher_service_1 = require("../../core/services/publisher.service");
const add_comment_dto_1 = require("../../notes/dto/add-comment.dto");
const remove_comment_dto_1 = require("../../notes/dto/remove-comment.dto");
const add_answer_dto_1 = require("../../notes/dto/add-answer.dto");
let NotesResolver = class NotesResolver {
    constructor(notesService, usersService, publisherService) {
        this.notesService = notesService;
        this.usersService = usersService;
        this.publisherService = publisherService;
    }
    author(note) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.findOne(note.author);
        });
    }
    notesList(dto, skip = 0, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.notesService.findMany(dto, skip, limit);
        });
    }
    findNoteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.notesService.findOne(id);
        });
    }
    createNote(user, noteDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield this.notesService.createOne(noteDto, user._id);
            yield this.publisherService.publish(events_enum_1.Events.NOTES_NOTE_ADDED, note);
            return note;
        });
    }
    updateNote(id, noteDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.notesService.updateById(id, noteDto);
        });
    }
    deleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.notesService.deleteById(id);
        });
    }
    addLikePost(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.notesService.addLike(id, user._id);
        });
    }
    removeLikePost(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.notesService.removeLike(id, user._id);
        });
    }
    addDislikePost(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.notesService.addDislike(id, user._id);
        });
    }
    removeDislikePost(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.notesService.removeDislike(id, user._id);
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
    addAnswerToComment(user, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.notesService.addAnswerToComment(user._id, dto);
        });
    }
    noteAdded() {
        return {
            resolve(payload) {
                return payload;
            },
            subscribe: () => this.publisherService.asyncIterator(events_enum_1.Events.NOTES_NOTE_ADDED),
        };
    }
};
__decorate([
    graphql_1.ResolveProperty('author'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "author", null);
__decorate([
    graphql_1.Query('notesList'),
    __param(0, graphql_1.Args('input')),
    __param(1, graphql_1.Args('skip')),
    __param(2, graphql_1.Args('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_notes_list_dto_1.FindNotesListDto, Number, Number]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "notesList", null);
__decorate([
    graphql_1.Query('note'),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "findNoteById", null);
__decorate([
    graphql_1.Mutation('createNote'),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_note_dto_1.CreateNoteDto]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "createNote", null);
__decorate([
    graphql_1.Mutation('updateNote'),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_note_dto_1.UpdateNoteDto]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "updateNote", null);
__decorate([
    graphql_1.Mutation('deleteNote'),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "deleteNote", null);
__decorate([
    graphql_1.Mutation('addLikeToNote'),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "addLikePost", null);
__decorate([
    graphql_1.Mutation('removeLikeFromNote'),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "removeLikePost", null);
__decorate([
    graphql_1.Mutation('addDislikeToNote'),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "addDislikePost", null);
__decorate([
    graphql_1.Mutation('removeDislikeFromNote'),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "removeDislikePost", null);
__decorate([
    graphql_1.Mutation('addComment'),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_comment_dto_1.AddCommentDto]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "addComment", null);
__decorate([
    graphql_1.Mutation('removeComment'),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, remove_comment_dto_1.RemoveCommentDto]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "removeComment", null);
__decorate([
    graphql_1.Mutation('addAnswerToComment'),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_answer_dto_1.AddAnswerDto]),
    __metadata("design:returntype", Promise)
], NotesResolver.prototype, "addAnswerToComment", null);
__decorate([
    graphql_1.Subscription('noteAdded'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotesResolver.prototype, "noteAdded", null);
NotesResolver = __decorate([
    graphql_1.Resolver('Note'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [notes_service_1.NotesService,
        users_service_1.UsersService,
        publisher_service_1.PublisherService])
], NotesResolver);
exports.NotesResolver = NotesResolver;
//# sourceMappingURL=notes.resolver.js.map