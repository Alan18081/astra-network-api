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
const friendship_requests_type_enum_1 = require("./friendship-requests-type.enum");
const friendship_requests_repository_1 = require("./friendship-requests.repository");
const messages_enum_1 = require("../../helpers/enums/messages.enum");
const users_service_1 = require("../users/users.service");
let FriendshipRequestsService = class FriendshipRequestsService {
    constructor(friendshipRequestsRepository, usersService) {
        this.friendshipRequestsRepository = friendshipRequestsRepository;
        this.usersService = usersService;
    }
    checkIsValidOwner(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.friendshipRequestsRepository.findByIdAndSenderId(id, userId);
            if (!request) {
                throw new common_1.ForbiddenException(messages_enum_1.Messages.PROVIDED_USER_IS_NOT_SENDER);
            }
        });
    }
    findMany(userId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const field = type === friendship_requests_type_enum_1.FriendshipRequestsType.INCOMING ? 'receiver' : 'sender';
            return this.friendshipRequestsRepository.findMany({ [field]: userId });
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.friendshipRequestsRepository.findById(id);
        });
    }
    findOneBySenderId(senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.friendshipRequestsRepository.findOneBySenderId(senderId);
        });
    }
    createOne(senderId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const friendRequest = {
                sender: senderId,
                receiver: dto.receiverId,
                message: dto.message,
            };
            return this.friendshipRequestsRepository.save(friendRequest);
        });
    }
    deleteOne(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIsValidOwner(id, userId);
            return this.friendshipRequestsRepository.deleteById(id);
        });
    }
    acceptOne(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.friendshipRequestsRepository.findByIdAndReceiverId(id, userId);
            if (!request) {
                throw new common_1.NotFoundException(messages_enum_1.Messages.FRIENDSHIP_REQUEST_NOT_FOUND);
            }
            const [friend] = yield Promise.all([
                this.usersService.addFriend(userId, request.sender),
                this.usersService.addFriend(request.sender, userId),
                this.friendshipRequestsRepository.deleteById(request._id),
            ]);
            if (!friend) {
                throw new common_1.NotFoundException(messages_enum_1.Messages.FRIENDSHIP_REQUESTS_SENDER_IS_NOT_FOUND);
            }
            return friend;
        });
    }
};
FriendshipRequestsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [friendship_requests_repository_1.FriendshipRequestsRepository,
        users_service_1.UsersService])
], FriendshipRequestsService);
exports.FriendshipRequestsService = FriendshipRequestsService;
//# sourceMappingURL=friendship-requests.service.js.map