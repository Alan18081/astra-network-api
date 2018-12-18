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
const lodash_1 = require("lodash");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chat_entity_1 = require("./chat.entity");
const websockets_1 = require("@nestjs/websockets");
const messages_enum_1 = require("../../helpers/enums/messages.enum");
const users_service_1 = require("../users/users.service");
let ChatsService = class ChatsService {
    constructor(chatsRepository, usersService) {
        this.chatsRepository = chatsRepository;
        this.usersService = usersService;
    }
    findMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: {
                    id: query.userId,
                },
                relations: [],
            };
            options.relations = this.getRelations(query);
            return yield this.chatsRepository.find(options);
        });
    }
    findManyByIds(ids, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const relations = this.getRelations(query);
            return yield this.chatsRepository.findByIds(ids, { relations });
        });
    }
    addNewUserToChat(chatId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [chat, user] = yield Promise.all([
                this.findOne(chatId, { includeUsers: true }),
                this.usersService.findOne(userId),
            ]);
            if (!user) {
                throw new websockets_1.WsException(messages_enum_1.Messages.USER_NOT_FOUND);
            }
            if (!chat) {
                throw new websockets_1.WsException(messages_enum_1.Messages.CHAT_NOT_FOUND);
            }
            const foundUser = chat.users.find(({ id }) => id === userId);
            if (!foundUser) {
                chat.users.push(user);
            }
            return yield this.chatsRepository.save(chat);
        });
    }
    removeUserFromChat(chatId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [chat, user] = yield Promise.all([
                this.findOne(chatId, { includeUsers: true }),
                this.usersService.findOne(userId),
            ]);
            if (!user) {
                throw new websockets_1.WsException(messages_enum_1.Messages.USER_NOT_FOUND);
            }
            if (!chat) {
                throw new websockets_1.WsException(messages_enum_1.Messages.CHAT_NOT_FOUND);
            }
            chat.users = chat.users.filter(({ id }) => id !== userId);
            return yield this.chatsRepository.save(chat);
        });
    }
    getRelations(query) {
        const relations = [];
        if (query.includeMessages) {
            relations.push('messages');
        }
        if (query.includeUsers) {
            relations.push('users');
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
                    users: {
                        id: query.userId,
                    },
                };
            }
            options.relations = this.getRelations(query);
            const [data, totalCount] = yield this.chatsRepository.findAndCount(options);
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
            return yield this.chatsRepository.findOne({
                where: {
                    id,
                },
                relations,
            });
        });
    }
    createOne(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = new chat_entity_1.Chat();
            chat.name = payload.name;
            chat.createdAt = new Date();
            chat.users = lodash_1.uniqBy(payload.userIds.map(id => ({ id })), ({ id }) => id);
            yield this.chatsRepository.save(chat);
            return yield this.findOne(chat.id, { includeUsers: true });
        });
    }
    updateOne(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.chatsRepository.update(id, payload);
            return yield this.chatsRepository.findOne(id);
        });
    }
    deleteOne(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.chatsRepository.findOne(id, { relations: ['users'] });
            if (chat) {
                chat.users = chat.users.filter((user) => user.id !== userId);
                if (chat.users.length === 0) {
                    yield this.chatsRepository.delete({ id });
                }
                else {
                    yield this.chatsRepository.save(chat);
                }
            }
        });
    }
};
ChatsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(chat_entity_1.Chat)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], ChatsService);
exports.ChatsService = ChatsService;
//# sourceMappingURL=chats.service.js.map