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
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hash_service_1 = require("../core/services/hash.service");
const messages_enum_1 = require("../../helpers/enums/messages.enum");
let UsersService = class UsersService {
    constructor(usersRepository, hashService) {
        this.usersRepository = usersRepository;
        this.hashService = hashService;
    }
    findMany(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryBuilder = this.prepareBuilder(this.usersRepository.createQueryBuilder('user'), payload);
            return yield queryBuilder.getMany();
        });
    }
    prepareBuilder(queryBuilder, query) {
        if (query.ageFrom) {
            queryBuilder.where('age > :ageFrom', { ageFrom: query.ageFrom });
        }
        if (query.ageTo) {
            queryBuilder.where('age < :ageTo', { ageTo: query.ageTo });
        }
        return queryBuilder;
    }
    findManyWithPagination(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (query.page - 1) * query.limit;
            const queryBuilder = this.prepareBuilder(this.usersRepository.createQueryBuilder('user'), query);
            const totalCount = yield queryBuilder.getCount();
            const data = yield queryBuilder.skip(skip).take(query.limit).getMany();
            return {
                page: query.page,
                itemsPerPage: query.limit,
                totalCount,
                data,
            };
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOne(id);
            if (!user) {
                throw new common_1.NotFoundException(messages_enum_1.Messages.USER_NOT_FOUND);
            }
            return user;
        });
    }
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepository.findOne({
                email
            });
        });
    }
    findOneByGoogleId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepository.findOne({ googleId: id });
        });
    }
    createOne(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHash = yield this.hashService.generateHash(payload.password);
            const newUser = Object.assign({}, new user_entity_1.User(), payload, { password: passwordHash, createdAt: new Date() });
            return yield this.usersRepository.save(newUser);
        });
    }
    createByGoogle(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = Object.assign({}, new user_entity_1.User(), payload);
            return yield this.usersRepository.save(newUser);
        });
    }
    updateOne(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersRepository.update({ id }, payload);
            return yield this.usersRepository.findOne(id);
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersRepository.delete({ id });
        });
    }
    setNewPassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHash = yield this.hashService.generateHash(password);
            yield this.updateOne(id, { password: passwordHash });
        });
    }
    addFriend(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersRepository
                .createQueryBuilder()
                .relation(user_entity_1.User, 'friends')
                .of(userId)
                .add(friendId);
            return yield this.findOne(userId);
        });
    }
    removeFriend(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersRepository
                .createQueryBuilder()
                .relation(user_entity_1.User, 'friends')
                .of(userId)
                .remove(friendId);
            return yield this.findOne(userId);
        });
    }
    isFriend(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            const friend = yield this.usersRepository.findOne({
                where: {
                    id: friendId,
                    friends: {
                        id: friendId
                    }
                }
            });
            console.log('Some friend', friend);
            return !!friend;
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hash_service_1.HashService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map