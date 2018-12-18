"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var websockets_1 = require("@nestjs/websockets");
var common_1 = require("@nestjs/common");
var actions = require("./friendship-requests.actions");
var messages_enum_1 = require("../../helpers/enums/messages.enum");
var user_interceptor_1 = require("../../helpers/interceptors/user.interceptor");
var friendship_requests_type_enum_1 = require("./friendship-requests-type.enum");
var get_socket_id_with_namespace_1 = require("../../helpers/functions/get-socket-id-with-namespace");
var FriendshipRequestsGateway = /** @class */ (function () {
    function FriendshipRequestsGateway(friendshipRequestsService, usersService, clientsStoreService) {
        this.friendshipRequestsService = friendshipRequestsService;
        this.usersService = usersService;
        this.clientsStoreService = clientsStoreService;
    }
    FriendshipRequestsGateway.prototype.onFetchIncomingFriendshipRequests = function (client, data) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Hello');
                        return [4 /*yield*/, this.fetchFriendshipRequests(client.user.id, data, friendship_requests_type_enum_1.FriendshipRequestsType.INCOMING)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, new actions.FetchIncomingFriendshipRequests(result)];
                }
            });
        });
    };
    FriendshipRequestsGateway.prototype.onFetchOutgoingFriendshipRequests = function (client, data) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchFriendshipRequests(client.user.id, data, friendship_requests_type_enum_1.FriendshipRequestsType.OUTGOING)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, new actions.FetchOutgoingFriendshipRequests(result)];
                }
            });
        });
    };
    FriendshipRequestsGateway.prototype.fetchFriendshipRequests = function (userId, _a, type) {
        var page = _a.page, limit = _a.limit;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(page && limit)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.friendshipRequestsService.findManyWithPagination(userId, { page: page, limit: limit }, type)];
                    case 1:
                        response = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.friendshipRequestsService.findMany(userId, type)];
                    case 3:
                        response = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, response];
                }
            });
        });
    };
    FriendshipRequestsGateway.prototype.onSendFriendshipRequest = function (client, data) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, isFriend, e_1, friendshipRequest, newFriendshipRequest, socket;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(client.user);
                        userId = client.user.id;
                        console.log(userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.usersService.isFriend(userId, data.receiverId)];
                    case 2:
                        isFriend = _a.sent();
                        console.log('Is friend', isFriend);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log('Friend error', e_1);
                        return [3 /*break*/, 4];
                    case 4: return [4 /*yield*/, this.friendshipRequestsService.findOneBySenderId(userId)];
                    case 5:
                        friendshipRequest = _a.sent();
                        if (friendshipRequest) {
                            return [2 /*return*/, new websockets_1.WsException(messages_enum_1.Messages.FRIENDSHIP_REQUEST_ALREADY_EXISTS)];
                        }
                        return [4 /*yield*/, this.friendshipRequestsService.createOne(userId, data.receiverId, data.message)];
                    case 6:
                        newFriendshipRequest = _a.sent();
                        return [4 /*yield*/, this.clientsStoreService.getSocketByUserId(newFriendshipRequest.receiverId)];
                    case 7:
                        socket = _a.sent();
                        if (socket) {
                            this.server.to(get_socket_id_with_namespace_1.getSocketIdWithNamespace('friendship', socket.id)).emit(actions.NEW_FRIENDSHIP_REQUEST, newFriendshipRequest);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FriendshipRequestsGateway.prototype.onAcceptFriendshipRequest = function (client, data) {
        return __awaiter(this, void 0, void 0, function () {
            var friendshipRequest, userId, _a, friend, user, socket;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.friendshipRequestsService.findOne(data.id)];
                    case 1:
                        friendshipRequest = _b.sent();
                        userId = client.user.id;
                        if (!friendshipRequest) {
                            throw new websockets_1.WsException(messages_enum_1.Messages.FRIENDSHIP_REQUEST_NOT_FOUND);
                        }
                        if (friendshipRequest.receiverId !== userId) {
                            throw new websockets_1.WsException(messages_enum_1.Messages.PROVIDED_USER_IS_NOT_RECEIVER);
                        }
                        return [4 /*yield*/, Promise.all([
                                this.usersService.addFriend(friendshipRequest.receiverId, userId),
                                this.usersService.addFriend(userId, friendshipRequest.receiverId),
                                this.friendshipRequestsService.deleteOne(friendshipRequest.id)
                            ])];
                    case 2:
                        _a = _b.sent(), friend = _a[0], user = _a[1];
                        if (!(friend && user)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.clientsStoreService.getSocketByUserId(friend.id)];
                    case 3:
                        socket = _b.sent();
                        if (socket) {
                            this.server.to(get_socket_id_with_namespace_1.getSocketIdWithNamespace('friendship', socket.id)).emit(actions.NEW_ACCEPTED_FRIENDSHIP_REQUEST, user);
                        }
                        _b.label = 4;
                    case 4: return [2 /*return*/, new actions.AcceptFriendshipRequest(friend)];
                }
            });
        });
    };
    FriendshipRequestsGateway.prototype.onRejectFriendshipRequest = function (client, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.friendshipRequestsService.deleteOne(data.id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        websockets_1.WebSocketServer()
    ], FriendshipRequestsGateway.prototype, "server", void 0);
    __decorate([
        websockets_1.SubscribeMessage(actions.FETCH_INCOMING_FRIENDSHIP_REQUESTS)
    ], FriendshipRequestsGateway.prototype, "onFetchIncomingFriendshipRequests", null);
    __decorate([
        websockets_1.SubscribeMessage(actions.FETCH_OUTGOING_FRIENDSHIP_REQUESTS)
    ], FriendshipRequestsGateway.prototype, "onFetchOutgoingFriendshipRequests", null);
    __decorate([
        websockets_1.SubscribeMessage('Hello')
    ], FriendshipRequestsGateway.prototype, "onSendFriendshipRequest", null);
    __decorate([
        websockets_1.SubscribeMessage(actions.ACCEPT_FRIENDSHIP_REQUEST)
    ], FriendshipRequestsGateway.prototype, "onAcceptFriendshipRequest", null);
    __decorate([
        websockets_1.SubscribeMessage(actions.REMOVE_FRIENDSHIP_REQUEST)
    ], FriendshipRequestsGateway.prototype, "onRejectFriendshipRequest", null);
    FriendshipRequestsGateway = __decorate([
        websockets_1.WebSocketGateway({ namespace: '/' }),
        common_1.UsePipes(common_1.ValidationPipe),
        common_1.UseFilters(websockets_1.BaseWsExceptionFilter),
        common_1.UseInterceptors(user_interceptor_1.UserInterceptor)
    ], FriendshipRequestsGateway);
    return FriendshipRequestsGateway;
}());
exports.FriendshipRequestsGateway = FriendshipRequestsGateway;
