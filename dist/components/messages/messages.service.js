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
const message_entity_1 = require("./message.entity");
const typeorm_2 = require("typeorm");
let MessagesService = class MessagesService {
    constructor(messagesRepository) {
        this.messagesRepository = messagesRepository;
    }
    getRelations(query) {
        const relations = [];
        if (query.includeUser) {
            relations.push('user');
        }
        return relations;
    }
    findOne(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const relations = this.getRelations(query);
            return yield this.messagesRepository.findOne({
                where: {
                    id
                },
                relations
            });
        });
    }
    createOne(userId, chatId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMessage = Object.assign({}, new message_entity_1.Message(), { text, user: { id: userId }, userId, chat: { id: chatId }, createdAt: new Date().toISOString() });
            yield this.messagesRepository.save(newMessage);
            return yield this.findOne(newMessage.id, { includeUser: true });
        });
    }
    updateOne(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.messagesRepository.update({
                id: payload.messageId,
            }, {
                text: payload.text,
            });
            return yield this.findOne(payload.messageId, { includeUser: true });
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.messagesRepository.delete({ id });
        });
    }
};
MessagesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map