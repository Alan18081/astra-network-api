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
const typeorm_1 = require("@nestjs/typeorm");
const friendship_request_entity_1 = require("./friendship-request.entity");
const typeorm_2 = require("typeorm");
const friendship_requests_type_enum_1 = require("./friendship-requests-type.enum");
let FriendshipRequestsService = class FriendshipRequestsService {
    constructor(friendshipRequestsRepository) {
        this.friendshipRequestsRepository = friendshipRequestsRepository;
    }
    findMany(userId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const field = type === friendship_requests_type_enum_1.FriendshipRequestsType.INCOMING ? 'receiverId' : 'senderId';
            return yield this.friendshipRequestsRepository.find({
                where: {
                    [field]: userId
                },
                relations: [type === friendship_requests_type_enum_1.FriendshipRequestsType.INCOMING ? 'sender' : 'receiver']
            });
        });
    }
    findManyWithPagination(userId, { page, limit }, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const field = type === friendship_requests_type_enum_1.FriendshipRequestsType.INCOMING ? 'receiverId' : 'senderId';
            const [requests, totalCount] = yield this.friendshipRequestsRepository.findAndCount({
                where: {
                    [field]: userId
                },
                skip: (page - 1) * limit,
                take: limit,
                relations: [type === friendship_requests_type_enum_1.FriendshipRequestsType.INCOMING ? 'receiver' : 'sender']
            });
            return {
                data: requests,
                page,
                totalCount,
                itemsPerPage: limit
            };
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.friendshipRequestsRepository.findOne(id);
        });
    }
    findOneBySenderId(senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.friendshipRequestsRepository.findOne({ senderId });
        });
    }
    createOne(senderId, receiverId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const friendRequest = new friendship_request_entity_1.FriendshipRequest({
                senderId,
                receiverId,
                message
            });
            return yield this.friendshipRequestsRepository.save(friendRequest);
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.friendshipRequestsRepository.delete({ id });
        });
    }
};
FriendshipRequestsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(friendship_request_entity_1.FriendshipRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FriendshipRequestsService);
exports.FriendshipRequestsService = FriendshipRequestsService;
//# sourceMappingURL=friendship-requests.service.js.map