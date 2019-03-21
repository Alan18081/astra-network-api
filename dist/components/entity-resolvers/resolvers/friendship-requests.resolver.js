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
const friendship_requests_service_1 = require("../../friendship-requests/friendship-requests.service");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../../helpers/guards/auth.guard");
const user_decorator_1 = require("../../../helpers/decorators/user.decorator");
const friendship_requests_type_enum_1 = require("../../friendship-requests/friendship-requests-type.enum");
const create_request_dto_1 = require("../../friendship-requests/dto/create-request.dto");
const publisher_service_1 = require("../../core/services/publisher.service");
const events_enum_1 = require("../../../helpers/enums/events.enum");
const users_service_1 = require("../../users/users.service");
const graphql_subscriptions_1 = require("graphql-subscriptions");
let FriendshipRequestsResolver = class FriendshipRequestsResolver {
    constructor(friendshipRequestsService, publisherService, usersService) {
        this.friendshipRequestsService = friendshipRequestsService;
        this.publisherService = publisherService;
        this.usersService = usersService;
    }
    sender({ sender }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.findOne(sender);
        });
    }
    receiver({ receiver }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.findOne(receiver);
        });
    }
    findManyIncomingRequests(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.friendshipRequestsService.findMany(user._id, friendship_requests_type_enum_1.FriendshipRequestsType.INCOMING);
        });
    }
    findManyOutgoingRequests(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.friendshipRequestsService.findMany(user._id, friendship_requests_type_enum_1.FriendshipRequestsType.OUTGOING);
        });
    }
    sendOne(user, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.friendshipRequestsService.createOne(user._id, dto);
            yield this.publisherService.publish(events_enum_1.Events.FRIENDSHIP_REQUESTS_SENT_REQUEST, request);
            return request;
        });
    }
    deleteOne(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.friendshipRequestsService.deleteOne(id, user._id);
        });
    }
    acceptOne(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const friend = yield this.friendshipRequestsService.acceptOne(id, user._id);
            yield this.publisherService.publish(events_enum_1.Events.FRIENDSHIP_REQUESTS_ACCEPTED_REQUEST, { senderId: friend._id, user });
            return friend;
        });
    }
    declineOne(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const senderId = yield this.friendshipRequestsService.declineOne(id, user._id);
            yield this.publisherService.publish(events_enum_1.Events.FRIENDSHIP_REQUESTS_DECLINED_REQUEST, { senderId, user });
        });
    }
    onSentOne() {
        return {
            resolve: payload => payload,
            subscribe: graphql_subscriptions_1.withFilter(() => this.publisherService.asyncIterator(events_enum_1.Events.FRIENDSHIP_REQUESTS_SENT_REQUEST), (payload, args, { user }) => {
                return payload.senderId.toString() === user._id.toString();
            })
        };
    }
    onAcceptedOne() {
        return {
            resolve: (payload) => payload.user,
            subscribe: graphql_subscriptions_1.withFilter(() => this.publisherService.asyncIterator(events_enum_1.Events.FRIENDSHIP_REQUESTS_ACCEPTED_REQUEST), (payload, args, { user }) => {
                console.log(payload.senderId, user._id);
                console.log(payload.senderId === user._id);
                return payload.senderId.toString() === user._id.toString();
            })
        };
    }
    onDeclinedOne() {
        return {
            resolve: (payload) => payload.user,
            subscribe: graphql_subscriptions_1.withFilter(() => this.publisherService.asyncIterator(events_enum_1.Events.FRIENDSHIP_REQUESTS_DECLINED_REQUEST), (payload, args, { user }) => {
                return payload.senderId.toString() === user._id.toString();
            })
        };
    }
};
__decorate([
    graphql_1.ResolveProperty('sender'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendshipRequestsResolver.prototype, "sender", null);
__decorate([
    graphql_1.ResolveProperty('receiver'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendshipRequestsResolver.prototype, "receiver", null);
__decorate([
    graphql_1.Query('incomingFriendshipRequestsList'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendshipRequestsResolver.prototype, "findManyIncomingRequests", null);
__decorate([
    graphql_1.Query('outgoingFriendshipRequestsList'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendshipRequestsResolver.prototype, "findManyOutgoingRequests", null);
__decorate([
    graphql_1.Mutation('sendFriendshipRequest'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_request_dto_1.CreateRequestDto]),
    __metadata("design:returntype", Promise)
], FriendshipRequestsResolver.prototype, "sendOne", null);
__decorate([
    graphql_1.Mutation('deleteFriendshipRequest'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FriendshipRequestsResolver.prototype, "deleteOne", null);
__decorate([
    graphql_1.Mutation('acceptFriendshipRequest'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FriendshipRequestsResolver.prototype, "acceptOne", null);
__decorate([
    graphql_1.Mutation('declineFriendshipRequest'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FriendshipRequestsResolver.prototype, "declineOne", null);
__decorate([
    graphql_1.Subscription('friendshipRequestSent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FriendshipRequestsResolver.prototype, "onSentOne", null);
__decorate([
    graphql_1.Subscription('friendshipRequestAccepted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FriendshipRequestsResolver.prototype, "onAcceptedOne", null);
__decorate([
    graphql_1.Subscription('friendshipRequestDeclined'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FriendshipRequestsResolver.prototype, "onDeclinedOne", null);
FriendshipRequestsResolver = __decorate([
    graphql_1.Resolver('FriendshipRequest'),
    __metadata("design:paramtypes", [friendship_requests_service_1.FriendshipRequestsService,
        publisher_service_1.PublisherService,
        users_service_1.UsersService])
], FriendshipRequestsResolver);
exports.FriendshipRequestsResolver = FriendshipRequestsResolver;
//# sourceMappingURL=friendship-requests.resolver.js.map