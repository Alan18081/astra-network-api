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
const typeorm_1 = require("@nestjs/typeorm");
const note_entity_1 = require("./note.entity");
const typeorm_2 = require("typeorm");
let NotesService = class NotesService {
    constructor(notesRepository) {
        this.notesRepository = notesRepository;
    }
    findMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: {},
                relations: ['user'],
            };
            if (query.userId) {
                options.where = {
                    userId: query.userId,
                };
            }
            options.relations = this.getRelations(query);
            return yield this.notesRepository.find(options);
        });
    }
    findManyByIds(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const relations = this.getRelations(query);
            return yield this.notesRepository.findByIds(query.ids, { relations });
        });
    }
    getRelations(query) {
        const relations = ['user'];
        if (query.includeFiles) {
            relations.push('files');
        }
        return relations;
    }
    findManyWithPagination(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: {},
                relations: [],
                skip: (query.page - 1) * query.limit,
                take: query.limit,
            };
            if (query.userId) {
                options.where = {
                    userId: query.userId,
                };
            }
            options.relations = this.getRelations(query);
            const [data, totalCount] = yield this.notesRepository.findAndCount(options);
            return {
                page: query.page,
                itemsPerPage: query.limit,
                totalCount,
                data,
            };
        });
    }
    findOne(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const relations = this.getRelations(query);
            return yield this.notesRepository.findOne({
                where: {
                    id,
                },
                relations,
            });
        });
    }
    createOne(payload, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = new note_entity_1.Note();
            note.title = payload.title;
            note.description = payload.description;
            note.createdAt = new Date();
            note.user = { id: userId };
            yield this.notesRepository.save(note);
            return yield this.findOne(note.id, { includeFiles: true });
        });
    }
    updateOne(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.notesRepository.update(id, payload);
            return yield this.findOne(id, { includeFiles: true });
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.notesRepository.delete(id);
        });
    }
};
NotesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(note_entity_1.Note)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotesService);
exports.NotesService = NotesService;
//# sourceMappingURL=notes.service.js.map