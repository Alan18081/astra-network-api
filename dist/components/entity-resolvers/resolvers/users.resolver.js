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
const create_user_dto_1 = require("../../users/dto/create-user.dto");
const users_service_1 = require("../../users/users.service");
const user_decorator_1 = require("../../../helpers/decorators/user.decorator");
const common_1 = require("@nestjs/common");
const update_user_dto_1 = require("../../users/dto/update-user.dto");
const auth_guard_1 = require("../../../helpers/guards/auth.guard");
const publisher_service_1 = require("../../core/services/publisher.service");
const events_enum_1 = require("../../../helpers/enums/events.enum");
const change_password_dto_1 = require("../../users/dto/change-password.dto");
const find_many_users_list_dto_1 = require("../../users/dto/find-many-users-list.dto");
const graphql_subscriptions_1 = require("graphql-subscriptions");
let UsersResolver = class UsersResolver {
    constructor(usersService, publisherService) {
        this.usersService = usersService;
        this.publisherService = publisherService;
    }
    friends(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.findUserFriends(user._id);
        });
    }
    findMany(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.findMany(dto);
        });
    }
    findOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.findOne(id);
        });
    }
    getProfile(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user;
        });
    }
    createUser(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.createOne(userDto);
        });
    }
    updateUser(user, userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.updateById(user._id, userDto);
        });
    }
    changePassword(user, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersService.changePassword(user, dto);
            return true;
        });
    }
    deleteFriend(user, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                this.usersService.removeFriend(user._id, friendId),
                this.usersService.removeFriend(friendId, user._id)
            ]);
            return true;
        });
    }
    checkIsFriend(user, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.checkIsFriend(user._id, friendId);
        });
    }
    onUserStatusChanged() {
        return {
            subscribe: graphql_subscriptions_1.withFilter(() => this.publisherService.asyncIterator(events_enum_1.Events.USER_STATUS_CHANGED), (payload, { id }) => payload._id === id)
        };
    }
};
__decorate([
    graphql_1.ResolveProperty('friends'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "friends", null);
__decorate([
    graphql_1.Query('usersList'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_many_users_list_dto_1.FindManyUsersListDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "findMany", null);
__decorate([
    graphql_1.Query('user'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "findOneById", null);
__decorate([
    graphql_1.Query('profile'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getProfile", null);
__decorate([
    graphql_1.Mutation('createUser'),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    graphql_1.Mutation('updateProfile'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    graphql_1.Mutation('changePassword'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "changePassword", null);
__decorate([
    graphql_1.Mutation('deleteFriend'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('friendId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "deleteFriend", null);
__decorate([
    graphql_1.Mutation('checkIsFriend'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('friendId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "checkIsFriend", null);
__decorate([
    graphql_1.Subscription('userStatusChanged'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "onUserStatusChanged", null);
UsersResolver = __decorate([
    graphql_1.Resolver('User'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        publisher_service_1.PublisherService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map