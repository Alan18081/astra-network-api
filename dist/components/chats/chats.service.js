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
const lodash_1 = require("lodash");
const messages_enum_1 = require("../../helpers/enums/messages.enum");
const users_service_1 = require("../users/users.service");
const chats_repository_1 = require("./chats.repository");
let ChatsService = class ChatsService {
    constructor(chatsRepository, usersService) {
        this.chatsRepository = chatsRepository;
        this.usersService = usersService;
    }
    findMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (query.ids) {
                return this.chatsRepository.findManyByIds(query.ids);
            }
            return this.chatsRepository.findMany({});
        });
    }
    setLastMessage(chatId, messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.chatsRepository.setLastMessage(chatId, messageId);
        });
    }
    addUserToChat(adderId, { chatId, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const [chat, user] = yield Promise.all([
                this.findOneByIdAndUserId(chatId, adderId),
                this.usersService.findOne(userId),
            ]);
            if (!user) {
                throw new common_1.NotFoundException(messages_enum_1.Messages.USER_NOT_FOUND);
            }
            if (!chat) {
                throw new common_1.NotFoundException(messages_enum_1.Messages.CHAT_NOT_FOUND);
            }
            const updatedChat = yield this.chatsRepository.addUserToChat(chat._id, user._id);
            return {
                chat: updatedChat,
                user
            };
        });
    }
    removeUserFromChat(adminId, { chatId, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const [chat, user] = yield Promise.all([
                this.chatsRepository.findOneByIdAndAdminId(chatId, adminId),
                this.usersService.findOne(userId),
            ]);
            if (!user) {
                throw new common_1.NotFoundException(messages_enum_1.Messages.USER_NOT_FOUND);
            }
            if (!chat) {
                throw new common_1.NotFoundException(messages_enum_1.Messages.CHAT_NOT_FOUND);
            }
            const updatedChat = yield this.chatsRepository.removeUserFromChat(chat._id, user._id);
            return {
                chat: updatedChat,
                user
            };
        });
    }
    leaveChat(chatId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.findOne(chatId);
            if (!chat) {
                throw new common_1.NotFoundException(messages_enum_1.Messages.CHAT_NOT_FOUND);
            }
            return this.chatsRepository.removeUserFromChat(chatId, userId);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatsRepository.findChatById(id);
        });
    }
    createOne(userId, { name, userIds }) {
        return __awaiter(this, void 0, void 0, function* () {
            userIds.push(userId);
            const chat = {
                name,
                admin: userId,
                createdAt: new Date(),
                users: lodash_1.uniqBy(userIds, id => id),
            };
            return this.chatsRepository.save(chat);
        });
    }
    updateById(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatsRepository.updateById(id, payload);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.chatsRepository.deleteById(id);
        });
    }
    findOneByIdAndUserId(chatId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatsRepository.findOneByIdAndUserId(chatId, userId);
        });
    }
    filterMessages(message, chatId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.chat.toString() !== chatId) {
                return false;
            }
            const chat = yield this.findOneByIdAndUserId(chatId, userId);
            return !!chat;
        });
    }
};
ChatsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [chats_repository_1.ChatsRepository,
        users_service_1.UsersService])
], ChatsService);
exports.ChatsService = ChatsService;
//# sourceMappingURL=chats.service.js.map