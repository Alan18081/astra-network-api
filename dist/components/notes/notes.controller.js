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
const passport_1 = require("@nestjs/passport");
const notes_service_1 = require("./notes.service");
const user_decorator_1 = require("../../helpers/decorators/user.decorator");
const user_entity_1 = require("../users/user.entity");
const find_notes_list_dto_1 = require("./dto/find-notes-list.dto");
const find_one_note_dto_1 = require("./dto/find-one-note.dto");
const update_note_dto_1 = require("./dto/update-note.dto");
const create_note_dto_1 = require("./dto/create-note.dto");
const notes_gateway_1 = require("./notes.gateway");
const notesActions = require("./notes.actions");
let NotesController = class NotesController {
    constructor(notesService, notesGateway) {
        this.notesService = notesService;
        this.notesGateway = notesGateway;
    }
    findMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (query.ids) {
                return yield this.notesService.findManyByIds(query);
            }
            else {
                return yield this.notesService.findMany(query);
            }
        });
    }
    findOne(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.notesService.findOne(+id, query);
        });
    }
    createOne(user, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield this.notesService.createOne(payload, user.id);
            if (note) {
                const action = new notesActions.AddedNote(note);
                this.notesGateway.emitMessage(action);
            }
            return note;
        });
    }
    updateOne(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.notesService.updateOne(id, payload);
        });
    }
    deleteOne(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.notesService.deleteOne(id);
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'Get list of notes for particular user' }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_notes_list_dto_1.FindNotesListDto]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "findMany", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation({ title: 'Get note by id' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, find_one_note_dto_1.FindOneNoteDto]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Create new note' }),
    __param(0, user_decorator_1.ReqUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, create_note_dto_1.CreateNoteDto]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "createOne", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiOperation({ title: 'Update particular note' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_note_dto_1.UpdateNoteDto]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "updateOne", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiOperation({ title: 'Delete particular note by id' }),
    __param(0, user_decorator_1.ReqUser()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "deleteOne", null);
NotesController = __decorate([
    common_1.Controller('notes'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiUseTags('Notes'),
    __metadata("design:paramtypes", [notes_service_1.NotesService,
        notes_gateway_1.NotesGateway])
], NotesController);
exports.NotesController = NotesController;
//# sourceMappingURL=notes.controller.js.map