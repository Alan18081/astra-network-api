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
const auth_module_1 = require("./components/auth/auth.module");
const files_module_1 = require("./components/files/files.module");
const messages_module_1 = require("./components/messages/messages.module");
const chats_module_1 = require("./components/chats/chats.module");
const notes_module_1 = require("./components/notes/notes.module");
const refresh_tokens_module_1 = require("./components/refresh-tokens/refresh-tokens.module");
const friendship_requests_module_1 = require("./components/friendship-requests/friendship-requests.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("./config");
const core_module_1 = require("./components/core/core.module");
const entity_resolvers_module_1 = require("./components/entity-resolvers/entity-resolvers.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot(config_1.DB_URL),
            entity_resolvers_module_1.EntityResolversModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            core_module_1.CoreModule,
            files_module_1.FilesModule,
            messages_module_1.MessagesModule,
            chats_module_1.ChatsModule,
            notes_module_1.NotesModule,
            refresh_tokens_module_1.RefreshTokensModule,
            friendship_requests_module_1.FriendshipRequestsModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map