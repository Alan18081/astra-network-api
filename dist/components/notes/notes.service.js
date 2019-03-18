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
const notes_repository_1 = require("./notes.repository");
const messages_enum_1 = require("../../helpers/enums/messages.enum");
let NotesService = class NotesService {
    constructor(notesRepository) {
        this.notesRepository = notesRepository;
    }
    checkIsNoteExists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield this.findOne(id);
            if (!note) {
                throw new common_1.NotFoundException(messages_enum_1.Messages.NOTES_NOTE_IS_NOT_FOUND);
            }
        });
    }
    findMany({ ids }, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ids) {
                return this.notesRepository.findByIds(ids, skip, limit);
            }
            return this.notesRepository.findMany({}, skip, limit);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.notesRepository.findById(id);
        });
    }
    createOne({ title, description }, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = {
                title,
                description,
                author: userId,
            };
            return this.notesRepository.save(note);
        });
    }
    updateById(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.notesRepository.updateById(id, payload);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.notesRepository.deleteById(id);
        });
    }
    addComment(userId, { text, noteId }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIsNoteExists(noteId);
            const newComment = {
                author: userId,
                createdAt: new Date(),
                text,
                answers: []
            };
            return this.notesRepository.addComment(noteId, newComment);
        });
    }
    removeComment(userId, { noteId, commentId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.notesRepository.removeComment(noteId, commentId);
        });
    }
    addAnswerToComment(userId, { text, noteId, commentId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const noteWithComment = yield this.notesRepository.findOneByIdAndCommentId(noteId, commentId);
            if (!noteWithComment) {
                throw new common_1.NotFoundException(messages_enum_1.Messages.NOTES_NOTE_WITH_PROVIDED_COMMENT_IS_NOT_FOUND);
            }
            const newAnswer = {
                author: userId,
                createdAt: new Date(),
                text
            };
            return this.notesRepository.addAnswerToComment(noteId, commentId, newAnswer);
        });
    }
    addLike(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIsNoteExists(id);
            return this.notesRepository.addLikeToNote(id, userId);
        });
    }
    removeLike(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIsNoteExists(id);
            return this.notesRepository.removeLikeFromNote(id, userId);
        });
    }
    addDislike(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIsNoteExists(id);
            return this.notesRepository.addDislikeToNote(id, userId);
        });
    }
    removeDislike(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIsNoteExists(id);
            return this.notesRepository.removeDislikeFromNote(id, userId);
        });
    }
};
NotesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [notes_repository_1.NotesRepository])
], NotesService);
exports.NotesService = NotesService;
//# sourceMappingURL=notes.service.js.map