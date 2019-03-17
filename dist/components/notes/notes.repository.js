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
const base_repository_1 = require("../core/base.repository");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_1 = require("@nestjs/common");
let NotesRepository = class NotesRepository extends base_repository_1.BaseRepository {
    constructor(noteModel) {
        super(noteModel);
    }
    findByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.find({ _id: { $in: ids } });
        });
    }
    findOneByIdAndCommentId(noteId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findOne({ _id: noteId, 'comments._id': commentId });
        });
    }
    addComment(noteId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findByIdAndUpdate(noteId, { $push: { comments: comment } }, { new: true });
        });
    }
    removeComment(noteId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findByIdAndUpdate({ _id: noteId }, { $pull: { 'comments._id': commentId } });
        });
    }
    addAnswerToComment(noteId, commentId, answer) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findOneAndUpdate({ _id: noteId, 'comments._id': commentId }, { $push: { 'comments.$.answers': answer } });
        });
    }
    addLikeToNote(noteId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findOneAndUpdate({ _id: noteId, likedUsers: { $ne: userId } }, { $inc: { likes: 1 }, $push: { likedUsers: userId } }, { new: true });
        });
    }
    removeLikeFromNote(noteId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findOneAndUpdate({ _id: noteId, likedUsers: userId }, { $inc: { likes: -1 }, $pull: { likedUsers: userId } }, { new: true });
        });
    }
    addDislikeToNote(noteId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findOneAndUpdate({ _id: noteId, dislikedUsers: { $ne: userId } }, { $inc: { dislikes: 1 }, $push: { dislikedUsers: userId } }, { new: true });
        });
    }
    removeDislikeFromNote(noteId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findOneAndUpdate({ _id: noteId, dislikedUsers: userId }, { $inc: { dislikes: -1 }, $pull: { dislikedUsers: userId } }, { new: true });
        });
    }
};
NotesRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Note')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NotesRepository);
exports.NotesRepository = NotesRepository;
//# sourceMappingURL=notes.repository.js.map