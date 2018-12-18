"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var common_1 = require("@nestjs/common");
var user_entity_1 = require("./user.entity");
var typeorm_1 = require("@nestjs/typeorm");
var messages_enum_1 = require("../../helpers/enums/messages.enum");
var UsersService = /** @class */ (function () {
    function UsersService(usersRepository, hashService) {
        this.usersRepository = usersRepository;
        this.hashService = hashService;
    }
    UsersService.prototype.findMany = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var queryBuilder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryBuilder = this.prepareBuilder(this.usersRepository.createQueryBuilder('user'), payload);
                        return [4 /*yield*/, queryBuilder.getMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.prepareBuilder = function (queryBuilder, query) {
        if (query.ageFrom) {
            queryBuilder.where('age > :ageFrom', { ageFrom: query.ageFrom });
        }
        if (query.ageTo) {
            queryBuilder.where('age < :ageTo', { ageTo: query.ageTo });
        }
        return queryBuilder;
    };
    UsersService.prototype.findManyWithPagination = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var skip, queryBuilder, totalCount, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        skip = (query.page - 1) * query.limit;
                        queryBuilder = this.prepareBuilder(this.usersRepository.createQueryBuilder('user'), query);
                        return [4 /*yield*/, queryBuilder.getCount()];
                    case 1:
                        totalCount = _a.sent();
                        return [4 /*yield*/, queryBuilder.skip(skip).take(query.limit).getMany()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, {
                                page: query.page,
                                itemsPerPage: query.limit,
                                totalCount: totalCount,
                                data: data,
                            }];
                }
            });
        });
    };
    UsersService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.findOne(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException(messages_enum_1.Messages.USER_NOT_FOUND);
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UsersService.prototype.findOneByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.findOne({
                            email: email
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.findOneByGoogleId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.findOne({ googleId: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.createOne = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordHash, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hashService.generateHash(payload.password)];
                    case 1:
                        passwordHash = _a.sent();
                        newUser = __assign({}, new user_entity_1.User(), payload, { password: passwordHash, createdAt: new Date() });
                        return [4 /*yield*/, this.usersRepository.save(newUser)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.createByGoogle = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newUser = __assign({}, new user_entity_1.User(), payload);
                        return [4 /*yield*/, this.usersRepository.save(newUser)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.updateOne = function (id, payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.update({ id: id }, payload)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.usersRepository.findOne(id)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.deleteOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.delete({ id: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.setNewPassword = function (id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hashService.generateHash(password)];
                    case 1:
                        passwordHash = _a.sent();
                        return [4 /*yield*/, this.updateOne(id, { password: passwordHash })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.addFriend = function (userId, friendId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository
                            .createQueryBuilder()
                            .relation(user_entity_1.User, 'friends')
                            .of(userId)
                            .add(friendId)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.findOne(userId)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.removeFriend = function (userId, friendId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository
                            .createQueryBuilder()
                            .relation(user_entity_1.User, 'friends')
                            .of(userId)
                            .remove(friendId)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.findOne(userId)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.isFriend = function (userId, friendId) {
        return __awaiter(this, void 0, void 0, function () {
            var friend;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.findOne({
                            where: {
                                id: friendId,
                                friends: {
                                    id: friendId
                                }
                            }
                        })];
                    case 1:
                        friend = _a.sent();
                        console.log('Some friend', friend);
                        return [2 /*return*/, !!friend];
                }
            });
        });
    };
    UsersService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(user_entity_1.User))
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
