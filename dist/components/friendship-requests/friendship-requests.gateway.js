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
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const friendship_requests_service_1 = require("./friendship-requests.service");
const users_service_1 = require("../users/users.service");
const actions = require("./friendship-requests.actions");
const send_request_dto_1 = require("./dto/send-request.dto");
const accept_request_dto_1 = require("./dto/accept-request.dto");
const messages_enum_1 = require("../../helpers/enums/messages.enum");
const user_interceptor_1 = require("../../helpers/interceptors/user.interceptor");
const remove_request_dto_1 = require("./dto/remove-request.dto");
const pagination_dto_1 = require("../core/dto/pagination.dto");
const friendship_requests_type_enum_1 = require("./friendship-requests-type.enum");
const clients_store_service_1 = require("../core/services/clients-store.service");
const get_socket_id_with_namespace_1 = require("../../helpers/functions/get-socket-id-with-namespace");
let FriendshipRequestsGateway = class FriendshipRequestsGateway {
    constructor(friendshipRequestsService, usersService, clientsStoreService) {
        this.friendshipRequestsService = friendshipRequestsService;
        this.usersService = usersService;
        this.clientsStoreService = clientsStoreService;
    }
    onFetchIncomingFriendshipRequests(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Hello');
            const result = yield this.fetchFriendshipRequests(client.user.id, data, friendship_requests_type_enum_1.FriendshipRequestsType.INCOMING);
            return new actions.FetchIncomingFriendshipRequests(result);
        });
    }
    onFetchOutgoingFriendshipRequests(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.fetchFriendshipRequests(client.user.id, data, friendship_requests_type_enum_1.FriendshipRequestsType.OUTGOING);
            return new actions.FetchOutgoingFriendshipRequests(result);
        });
    }
    fetchFriendshipRequests(userId, { page, limit }, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (page && limit) {
                response = yield this.friendshipRequestsService.findManyWithPagination(userId, { page, limit }, type);
            }
            else {
                response = yield this.friendshipRequestsService.findMany(userId, type);
            }
            return response;
        });
    }
    onSendFriendshipRequest(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(client.user);
            const userId = client.user.id;
            console.log(userId);
            try {
                const isFriend = yield this.usersService.isFriend(userId, data.receiverId);
                console.log('Is friend', isFriend);
            }
            catch (e) {
                console.log('Friend error', e);
            }
            const friendshipRequest = yield this.friendshipRequestsService.findOneBySenderId(userId);
            if (friendshipRequest) {
                return new websockets_1.WsException(messages_enum_1.Messages.FRIENDSHIP_REQUEST_ALREADY_EXISTS);
            }
            const newFriendshipRequest = yield this.friendshipRequestsService.createOne(userId, data.receiverId, data.message);
            const socket = yield this.clientsStoreService.getSocketByUserId(newFriendshipRequest.receiverId);
            if (socket) {
                this.server.to(get_socket_id_with_namespace_1.getSocketIdWithNamespace('friendship', socket.id)).emit(actions.NEW_FRIENDSHIP_REQUEST, newFriendshipRequest);
            }
        });
    }
    onAcceptFriendshipRequest(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const friendshipRequest = yield this.friendshipRequestsService.findOne(data.id);
            const userId = client.user.id;
            if (!friendshipRequest) {
                throw new websockets_1.WsException(messages_enum_1.Messages.FRIENDSHIP_REQUEST_NOT_FOUND);
            }
            if (friendshipRequest.receiverId !== userId) {
                throw new websockets_1.WsException(messages_enum_1.Messages.PROVIDED_USER_IS_NOT_RECEIVER);
            }
            const [friend, user] = yield Promise.all([
                this.usersService.addFriend(friendshipRequest.receiverId, userId),
                this.usersService.addFriend(userId, friendshipRequest.receiverId),
                this.friendshipRequestsService.deleteOne(friendshipRequest.id)
            ]);
            if (friend && user) {
                const socket = yield this.clientsStoreService.getSocketByUserId(friend.id);
                if (socket) {
                    this.server.to(get_socket_id_with_namespace_1.getSocketIdWithNamespace('friendship', socket.id)).emit(actions.NEW_ACCEPTED_FRIENDSHIP_REQUEST, user);
                }
            }
            return new actions.AcceptFriendshipRequest(friend);
        });
    }
    onRejectFriendshipRequest(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.friendshipRequestsService.deleteOne(data.id);
        });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], FriendshipRequestsGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage(actions.FETCH_INCOMING_FRIENDSHIP_REQUESTS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], FriendshipRequestsGateway.prototype, "onFetchIncomingFriendshipRequests", null);
__decorate([
    websockets_1.SubscribeMessage(actions.FETCH_OUTGOING_FRIENDSHIP_REQUESTS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], FriendshipRequestsGateway.prototype, "onFetchOutgoingFriendshipRequests", null);
__decorate([
    websockets_1.SubscribeMessage('Hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, send_request_dto_1.SendRequestDto]),
    __metadata("design:returntype", Promise)
], FriendshipRequestsGateway.prototype, "onSendFriendshipRequest", null);
__decorate([
    websockets_1.SubscribeMessage(actions.ACCEPT_FRIENDSHIP_REQUEST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, accept_request_dto_1.AcceptRequestDto]),
    __metadata("design:returntype", Promise)
], FriendshipRequestsGateway.prototype, "onAcceptFriendshipRequest", null);
__decorate([
    websockets_1.SubscribeMessage(actions.REMOVE_FRIENDSHIP_REQUEST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, remove_request_dto_1.RemoveRequestDto]),
    __metadata("design:returntype", Promise)
], FriendshipRequestsGateway.prototype, "onRejectFriendshipRequest", null);
FriendshipRequestsGateway = __decorate([
    websockets_1.WebSocketGateway({ namespace: '/' }),
    common_1.UsePipes(common_1.ValidationPipe),
    common_1.UseFilters(websockets_1.BaseWsExceptionFilter),
    common_1.UseInterceptors(user_interceptor_1.UserInterceptor),
    __metadata("design:paramtypes", [friendship_requests_service_1.FriendshipRequestsService,
        users_service_1.UsersService,
        clients_store_service_1.ClientsStoreService])
], FriendshipRequestsGateway);
exports.FriendshipRequestsGateway = FriendshipRequestsGateway;
//# sourceMappingURL=friendship-requests.gateway.js.map