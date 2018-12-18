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
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const chats_service_1 = require("./chats.service");
const user_decorator_1 = require("../../helpers/decorators/user.decorator");
const user_entity_1 = require("../users/user.entity");
const create_chat_dto_1 = require("./dto/http/create-chat.dto");
const find_chats_list_dto_1 = require("./dto/http/find-chats-list.dto");
const update_chat_dto_1 = require("./dto/http/update-chat.dto");
const find_one_chat_dto_1 = require("./dto/http/find-one-chat.dto");
let ChatsController = class ChatsController {
    constructor(chatsService) {
        this.chatsService = chatsService;
    }
    findMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (query.ids) {
                return yield this.chatsService.findManyByIds(query.ids, query);
            }
            else if (query.page && query.limit) {
                return yield this.chatsService.findManyWithPagination(query);
            }
            else {
                return yield this.chatsService.findMany(query);
            }
        });
    }
    findOne(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.chatsService.findOne(+id, query);
        });
    }
    createOne(user, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            payload.userIds.push(user.id);
            return yield this.chatsService.createOne(payload);
        });
    }
    updateOne(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.chatsService.updateOne(id, payload);
        });
    }
    deleteOne(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.chatsService.deleteOne(id, user.id);
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'Get list of chats for particular user' }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_chats_list_dto_1.FindChatsListDto]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "findMany", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation({ title: 'Get chat by id' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, find_one_chat_dto_1.FindOneChatDto]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Get list of chats for particular user' }),
    __param(0, user_decorator_1.ReqUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, create_chat_dto_1.CreateChatDto]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "createOne", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiOperation({ title: 'Update particular chat' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_chat_dto_1.UpdateChatDto]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "updateOne", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiOperation({ title: 'Leave particular chat or delete if no users left' }),
    __param(0, user_decorator_1.ReqUser()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "deleteOne", null);
ChatsController = __decorate([
    common_1.Controller('chats'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiUseTags('Chats'),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [chats_service_1.ChatsService])
], ChatsController);
exports.ChatsController = ChatsController;
//# sourceMappingURL=chats.controller.js.map