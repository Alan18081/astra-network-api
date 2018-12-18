"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const users_module_1 = require("./components/users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("./config");
const auth_module_1 = require("./components/auth/auth.module");
const files_module_1 = require("./components/files/files.module");
const messages_module_1 = require("./components/messages/messages.module");
const chats_module_1 = require("./components/chats/chats.module");
const notes_module_1 = require("./components/notes/notes.module");
const refresh_tokens_module_1 = require("./components/refresh-tokens/refresh-tokens.module");
const app_gateway_1 = require("./app.gateway");
const friendship_requests_module_1 = require("./components/friendship-requests/friendship-requests.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(config_1.ORM_CONFIG),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            files_module_1.FilesModule,
            messages_module_1.MessagesModule,
            chats_module_1.ChatsModule,
            notes_module_1.NotesModule,
            refresh_tokens_module_1.RefreshTokensModule,
            friendship_requests_module_1.FriendshipRequestsModule
        ],
        controllers: [],
        providers: [app_gateway_1.AppGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map