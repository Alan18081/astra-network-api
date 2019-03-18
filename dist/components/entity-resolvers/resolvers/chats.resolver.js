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
const chats_service_1 = require("../../chats/chats.service");
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../../../helpers/decorators/user.decorator");
const find_chats_list_dto_1 = require("../../chats/dto/find-chats-list.dto");
const create_chat_dto_1 = require("../../chats/dto/create-chat.dto");
const update_chat_dto_1 = require("../../chats/dto/update-chat.dto");
const publisher_service_1 = require("../../core/services/publisher.service");
const id_equals_filter_1 = require("../../../helpers/handlers/id-equals.filter");
const events_enum_1 = require("../../../helpers/enums/events.enum");
const auth_guard_1 = require("../../../helpers/guards/auth.guard");
const add_user_to_chat_dto_1 = require("../../chats/dto/add-user-to-chat.dto");
const remove_user_from_chat_dto_1 = require("../../chats/dto/remove-user-from-chat.dto");
const users_service_1 = require("../../users/users.service");
const messages_service_1 = require("../../messages/messages.service");
let ChatsResolver = class ChatsResolver {
    constructor(chatsService, publisherService, usersService, messagesService) {
        this.chatsService = chatsService;
        this.publisherService = publisherService;
        this.usersService = usersService;
        this.messagesService = messagesService;
    }
    messages(chat, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.messagesService.findManyByChatId(chat._id, skip, limit);
        });
    }
    lastMessage(chat) {
        return __awaiter(this, void 0, void 0, function* () {
            if (chat.lastMessage) {
                return this.messagesService.findById(chat.lastMessage);
            }
            return null;
        });
    }
    admin(chat) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.findOne(chat.admin);
        });
    }
    users(chat) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.findManyByIds(chat.users);
        });
    }
    findManyChatsByUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatsService.findMany(dto);
        });
    }
    findChatById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatsService.findOne(id);
        });
    }
    createChat(user, chatDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatsService.createOne(user._id, chatDto);
        });
    }
    updateChat(id, chatDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatsService.updateById(id, chatDto);
        });
    }
    deleteChat(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.chatsService.deleteById(id);
            return true;
        });
    }
    addUserToChat(user, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatsService.addUserToChat(user._id, dto);
        });
    }
    removeUserFromChat(user, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatsService.removeUserFromChat(user._id, dto);
        });
    }
    attendChat(user, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatsService.addUserToChat(chatId, user._id);
        });
    }
    leaveChat(user, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.chatsService.leaveChat(chatId, user._id);
            yield this.publisherService.publish(events_enum_1.Events.CHATS_USER_REMOVED, { chatId, userId: user._id });
            return true;
        });
    }
    onUserAddedToChat(id) {
        return id_equals_filter_1.idEqualsFilter(id, () => this.publisherService.asyncIterator(events_enum_1.Events.CHATS_USER_ADDED));
    }
    onUserRemovedFromChat(id) {
        return id_equals_filter_1.idEqualsFilter(id, () => this.publisherService.asyncIterator(events_enum_1.Events.CHATS_USER_REMOVED));
    }
};
__decorate([
    graphql_1.ResolveProperty('messages'),
    __param(0, graphql_1.Parent()),
    __param(1, graphql_1.Args('skip')),
    __param(2, graphql_1.Args('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "messages", null);
__decorate([
    graphql_1.ResolveProperty('lastMessage'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "lastMessage", null);
__decorate([
    graphql_1.ResolveProperty('admin'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "admin", null);
__decorate([
    graphql_1.ResolveProperty('users'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "users", null);
__decorate([
    graphql_1.Query('chatsList'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_chats_list_dto_1.FindChatsListDto]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "findManyChatsByUser", null);
__decorate([
    graphql_1.Query('chat'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "findChatById", null);
__decorate([
    graphql_1.Mutation('createChat'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_chat_dto_1.CreateChatDto]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "createChat", null);
__decorate([
    graphql_1.Mutation('updateChat'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_chat_dto_1.UpdateChatDto]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "updateChat", null);
__decorate([
    graphql_1.Mutation('deleteChat'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "deleteChat", null);
__decorate([
    graphql_1.Mutation('addUserToChat'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_user_to_chat_dto_1.AddUserToChatDto]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "addUserToChat", null);
__decorate([
    graphql_1.Mutation('removeUserFromChat'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, remove_user_from_chat_dto_1.RemoveUserFromChatDto]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "removeUserFromChat", null);
__decorate([
    graphql_1.Mutation('attendChat'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "attendChat", null);
__decorate([
    graphql_1.Mutation('leaveChat'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "leaveChat", null);
__decorate([
    graphql_1.Subscription('userAddedToChat'),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatsResolver.prototype, "onUserAddedToChat", null);
__decorate([
    graphql_1.Subscription('userRemovedFromChat'),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatsResolver.prototype, "onUserRemovedFromChat", null);
ChatsResolver = __decorate([
    graphql_1.Resolver('Chat'),
    __metadata("design:paramtypes", [chats_service_1.ChatsService,
        publisher_service_1.PublisherService,
        users_service_1.UsersService,
        messages_service_1.MessagesService])
], ChatsResolver);
exports.ChatsResolver = ChatsResolver;
//# sourceMappingURL=chats.resolver.js.map