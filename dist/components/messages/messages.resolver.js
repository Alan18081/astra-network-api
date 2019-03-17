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
const messages_service_1 = require("./messages.service");
const add_message_dto_1 = require("./dto/add-message.dto");
const user_decorator_1 = require("../../helpers/decorators/user.decorator");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../helpers/guards/auth.guard");
const publisher_service_1 = require("../core/services/publisher.service");
const events_enum_1 = require("../../helpers/enums/events.enum");
const update_message_dto_1 = require("./dto/update-message.dto");
const graphql_subscriptions_1 = require("graphql-subscriptions");
let MessagesResolver = class MessagesResolver {
    constructor(messagesService, publisherService) {
        this.messagesService = messagesService;
        this.publisherService = publisherService;
    }
    sendMessage(user, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.messagesService.createOne(user._id, dto);
            console.log(message);
            yield this.publisherService.publish(events_enum_1.Events.CHATS_MESSAGE_ADDED, message);
            return message;
        });
    }
    editMessage(user, id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.messagesService.updateById(id, dto, user._id);
            yield this.publisherService.publish(events_enum_1.Events.CHATS_MESSAGE_EDITED, message);
            return message;
        });
    }
    deleteMessage(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.messagesService.deleteById(id, user._id);
            yield this.publisherService.publish(events_enum_1.Events.CHATS_MESSAGE_REMOVED, message);
            return message;
        });
    }
    messageAdded() {
        return {
            resolve(payload) {
                return payload;
            },
            subscribe: graphql_subscriptions_1.withFilter(() => this.publisherService.asyncIterator(events_enum_1.Events.CHATS_MESSAGE_ADDED), (payload, { chatId }, { user }) => {
                return this.messagesService.filterMessages(payload, chatId, user._id);
            })
        };
    }
    onMessageEditedToChat() {
        return {
            resolve(payload) {
                return payload;
            },
            subscribe: graphql_subscriptions_1.withFilter(() => this.publisherService.asyncIterator(events_enum_1.Events.CHATS_MESSAGE_EDITED), (payload, { chatId }) => {
                return payload.chat.toString() === chatId;
            })
        };
    }
    onMessageRemovedFromChat(id) {
        return {
            resolve(payload) {
                return payload;
            },
            subscribe: graphql_subscriptions_1.withFilter(() => this.publisherService.asyncIterator(events_enum_1.Events.CHATS_MESSAGE_REMOVED), (payload, { chatId }) => {
                return payload.chatId.toString() === chatId;
            })
        };
    }
};
__decorate([
    graphql_1.Mutation('sendMessage'),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_message_dto_1.AddMessageDto]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "sendMessage", null);
__decorate([
    graphql_1.Mutation('editMessage'),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('id')), __param(2, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_message_dto_1.UpdateMessageDto]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "editMessage", null);
__decorate([
    graphql_1.Mutation('deleteMessage'),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "deleteMessage", null);
__decorate([
    graphql_1.Subscription('messageAdded'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MessagesResolver.prototype, "messageAdded", null);
__decorate([
    graphql_1.Subscription('messageEdited'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MessagesResolver.prototype, "onMessageEditedToChat", null);
__decorate([
    graphql_1.Subscription('messageRemoved'),
    __param(0, graphql_1.Args('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessagesResolver.prototype, "onMessageRemovedFromChat", null);
MessagesResolver = __decorate([
    graphql_1.Resolver('Message'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        publisher_service_1.PublisherService])
], MessagesResolver);
exports.MessagesResolver = MessagesResolver;
//# sourceMappingURL=messages.resolver.js.map