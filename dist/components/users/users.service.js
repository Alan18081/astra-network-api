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
const hash_service_1 = require("../core/services/hash.service");
const messages_enum_1 = require("../../helpers/enums/messages.enum");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    constructor(usersRepository, hashService) {
        this.usersRepository = usersRepository;
        this.hashService = hashService;
    }
    findMany(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersRepository.findMany({});
        });
    }
    findManyByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersRepository.findManyByIds(ids);
        });
    }
    findUserFriends(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersRepository.findUserFriends(userId);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findById(id);
            if (!user) {
                throw new common_1.NotFoundException(messages_enum_1.Messages.USER_NOT_FOUND);
            }
            return user;
        });
    }
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersRepository.findOneByEmail(email);
        });
    }
    findOneByGoogleId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersRepository.findOneByGoogleId(id);
        });
    }
    createOne(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOneByEmail(payload.email);
            if (user) {
                throw new common_1.BadRequestException(messages_enum_1.Messages.USER_ALREADY_EXISTS);
            }
            const passwordHash = yield this.hashService.generateHash(payload.password);
            const newUser = Object.assign({}, payload, { password: passwordHash, createdAt: new Date() });
            return yield this.usersRepository.save(newUser);
        });
    }
    createByGoogle(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = Object.assign({}, payload);
            return yield this.usersRepository.save(newUser);
        });
    }
    updateById(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersRepository.updateById(id, payload);
        });
    }
    changePassword(user, { oldPassword, newPassword }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.hashService.compareHash(oldPassword, user.password))) {
                throw new common_1.ForbiddenException(messages_enum_1.Messages.INVALID_PASSWORD);
            }
            const newEncryptedPassword = yield this.hashService.generateHash(newPassword);
            return this.usersRepository.updateById(user._id, { password: newEncryptedPassword });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersRepository.deleteById(id);
        });
    }
    setNewPassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHash = yield this.hashService.generateHash(password);
            yield this.updateById(id, { password: passwordHash });
        });
    }
    addFriend(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersRepository.addFriend(userId, friendId);
        });
    }
    removeFriend(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersRepository.removeFriend(userId, friendId);
        });
    }
    checkIsFriend(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findUserWithFriend(userId, friendId);
            return !!user;
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        hash_service_1.HashService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map