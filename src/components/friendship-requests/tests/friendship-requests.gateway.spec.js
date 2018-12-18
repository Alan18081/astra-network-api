"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@nestjs/testing");
var friendship_requests_gateway_1 = require("../friendship-requests.gateway");
var users_service_1 = require("../../users/users.service");
var friendship_requests_service_1 = require("../friendship-requests.service");
var friendship_request_entity_1 = require("../friendship-request.entity");
var friendship_requests_actions_1 = require("../friendship-requests.actions");
var clients_store_service_1 = require("../../core/services/clients-store.service");
var websockets_1 = require("@nestjs/websockets");
var messages_enum_1 = require("../../../helpers/enums/messages.enum");
var user_entity_1 = require("../../users/user.entity");
var friendship_requests_type_enum_1 = require("../friendship-requests-type.enum");
var mockUsersService = {
    addFriend: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    }
};
var mockFriendshipRequestsService = {
    findIncomingRequests: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    },
    findOutgoingRequests: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    },
    findOne: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    },
    createOne: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    },
    deleteOne: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    }
};
describe('FriendshipRequestsGateway', function () {
    var friendshipRequestsGateway;
    var mockRequests = [new friendship_request_entity_1.FriendshipRequest({}), new friendship_request_entity_1.FriendshipRequest({})];
    var client = {
        user: { id: 10 }
    };
    var pagination = {
        page: 5,
        limit: 6
    };
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        imports: [],
                        controllers: [],
                        providers: [friendship_requests_gateway_1.FriendshipRequestsGateway],
                    }).overrideProvider(users_service_1.UsersService)
                        .useValue(mockUsersService)
                        .overrideProvider(friendship_requests_service_1.FriendshipRequestsService)
                        .useValue(mockFriendshipRequestsService)
                        .overrideProvider(clients_store_service_1.ClientsStoreService)
                        .useValue(new clients_store_service_1.ClientsStoreService())
                        .compile()];
                case 1:
                    module = _a.sent();
                    friendshipRequestsGateway = module.get(friendship_requests_gateway_1.FriendshipRequestsGateway);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('onFetchIncomingFriendshipRequests', function () {
        it('should call "fetchFriendshipRequests"', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spy = jest.spyOn(friendshipRequestsGateway, 'fetchFriendshipRequests').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, mockRequests];
                        }); }); });
                        return [4 /*yield*/, friendshipRequestsGateway.onFetchIncomingFriendshipRequests(client, pagination)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalledWith(client.user.id, pagination, friendship_requests_type_enum_1.FriendshipRequestsType.INCOMING);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return array of requests', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jest.spyOn(friendshipRequestsGateway, 'fetchFriendshipRequests').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, mockRequests];
                        }); }); });
                        _a = expect;
                        return [4 /*yield*/, friendshipRequestsGateway.onFetchIncomingFriendshipRequests(client, pagination)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toEqual(new friendship_requests_actions_1.FetchIncomingFriendshipRequests(mockRequests));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('onFetchOutgoingFriendshipRequests', function () {
        it('should call "fetchFriendshipRequests"', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spy = jest.spyOn(friendshipRequestsGateway, 'fetchFriendshipRequests').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, mockRequests];
                        }); }); });
                        return [4 /*yield*/, friendshipRequestsGateway.onFetchOutgoingFriendshipRequests(client, pagination)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalledWith(client.user.id, pagination, friendship_requests_type_enum_1.FriendshipRequestsType.OUTGOING);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return array of requests', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jest.spyOn(friendshipRequestsGateway, 'fetchFriendshipRequests').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, mockRequests];
                        }); }); });
                        _a = expect;
                        return [4 /*yield*/, friendshipRequestsGateway.onFetchOutgoingFriendshipRequests(client, pagination)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toEqual(new friendship_requests_actions_1.FetchOutgoingFriendshipRequests(mockRequests));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('onSendFriendshipRequest', function () {
        var mockRequest = new friendship_request_entity_1.FriendshipRequest({});
        var payload = { receiverId: 5, message: 'Hello' };
        it('should call "sendFriendshipRequest" on friendshipRequestsService with proper arguments', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spy = jest.spyOn(mockFriendshipRequestsService, 'createOne').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, mockRequest];
                        }); }); });
                        return [4 /*yield*/, friendshipRequestsGateway.onSendFriendshipRequest(client, payload)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalledWith(client.user.id, payload.receiverId, payload.message);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('onAcceptFriendshipRequest', function () {
        var mockRequest = new friendship_request_entity_1.FriendshipRequest({
            id: 5,
            receiverId: client.user.id
        });
        var payload = { id: 5 };
        it('should call "findOne" on friendshipRequestsService with requestId', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spy = jest.spyOn(mockFriendshipRequestsService, 'findOne').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, mockRequest];
                        }); }); });
                        return [4 /*yield*/, friendshipRequestsGateway.onAcceptFriendshipRequest(client, payload)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalledWith(payload.id);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if request is not found', function () { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(mockFriendshipRequestsService, 'findOne').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, undefined];
                        }); }); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, friendshipRequestsGateway.onAcceptFriendshipRequest(client, payload)];
                    case 2:
                        _a.sent();
                        expect(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(JSON.stringify(e_1)).toEqual(JSON.stringify(new websockets_1.WsException(messages_enum_1.Messages.FRIENDSHIP_REQUEST_NOT_FOUND)));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if receiverId is not equal to provided userId', function () { return __awaiter(_this, void 0, void 0, function () {
            var mockRequest, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockRequest = new friendship_request_entity_1.FriendshipRequest({
                            receiverId: 60
                        });
                        jest.spyOn(mockFriendshipRequestsService, 'findOne').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, mockRequest];
                        }); }); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, friendshipRequestsGateway.onAcceptFriendshipRequest(client, payload)];
                    case 2:
                        _a.sent();
                        expect(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        expect(JSON.stringify(e_2)).toEqual(JSON.stringify(new websockets_1.WsException(messages_enum_1.Messages.PROVIDED_USER_IS_NOT_RECEIVER)));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should call "addFriend: on usersService twice', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(mockFriendshipRequestsService, 'findOne').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, mockRequest];
                        }); }); });
                        spy = jest.spyOn(mockUsersService, 'addFriend');
                        return [4 /*yield*/, friendshipRequestsGateway.onAcceptFriendshipRequest(client, payload)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalledTimes(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call "deleteOne" on friendshipRequestsService twice', function () { return __awaiter(_this, void 0, void 0, function () {
            var spy;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(mockFriendshipRequestsService, 'findOne').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, mockRequest];
                        }); }); });
                        spy = jest.spyOn(mockFriendshipRequestsService, 'deleteOne');
                        return [4 /*yield*/, friendshipRequestsGateway.onAcceptFriendshipRequest(client, payload)];
                    case 1:
                        _a.sent();
                        expect(spy).toBeCalledWith(mockRequest.id);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should returns new friend', function () { return __awaiter(_this, void 0, void 0, function () {
            var friend, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        friend = new user_entity_1.User();
                        jest.spyOn(mockFriendshipRequestsService, 'findOne').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, mockRequest];
                        }); }); });
                        jest.spyOn(mockFriendshipRequestsService, 'deleteOne');
                        jest.spyOn(mockUsersService, 'addFriend').mockImplementation(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, friend];
                        }); }); });
                        _a = expect;
                        return [4 /*yield*/, friendshipRequestsGateway.onAcceptFriendshipRequest(client, payload)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toEqual(new friendship_requests_actions_1.AcceptFriendshipRequest(friend));
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
