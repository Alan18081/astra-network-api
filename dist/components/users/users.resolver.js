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
const create_user_dto_1 = require("./dto/create-user.dto");
const users_service_1 = require("./users.service");
const user_decorator_1 = require("../../helpers/decorators/user.decorator");
const common_1 = require("@nestjs/common");
const update_user_dto_1 = require("./dto/update-user.dto");
const auth_guard_1 = require("../../helpers/guards/auth.guard");
const publisher_service_1 = require("../core/services/publisher.service");
const events_enum_1 = require("../../helpers/enums/events.enum");
const id_equals_filter_1 = require("../../helpers/handlers/id-equals.filter");
const change_password_dto_1 = require("./dto/change-password.dto");
let UsersResolver = class UsersResolver {
    constructor(usersService, publisherService) {
        this.usersService = usersService;
        this.publisherService = publisherService;
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
    getFriends(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.findUserFriends(userId);
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
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.deleteById(id);
        });
    }
    removeFriend(user, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersService.removeFriend(user._id, friendId);
            return true;
        });
    }
    checkIsFriend(user, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.checkIsFriend(user._id, friendId);
        });
    }
    onUserStatusChanged(id) {
        return id_equals_filter_1.idEqualsFilter(id, () => this.publisherService.asyncIterator(events_enum_1.Events.USER_STATUS_CHANGED));
    }
};
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
    graphql_1.Query('friends'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, graphql_1.Args('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getFriends", null);
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
    graphql_1.Mutation('deleteUser'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "deleteUser", null);
__decorate([
    graphql_1.Mutation('removeFriend'),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, user_decorator_1.ReqUser()), __param(1, graphql_1.Args('friendId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "removeFriend", null);
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
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "onUserStatusChanged", null);
UsersResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        publisher_service_1.PublisherService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map