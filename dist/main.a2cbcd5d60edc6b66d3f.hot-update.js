exports.id = "main";
exports.modules = {

/***/ "./src/components/chats/chat.entity.ts":
/*!*********************************************!*\
  !*** ./src/components/chats/chat.entity.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst base_entity_1 = __webpack_require__(/*! ../core/base.entity */ \"./src/components/core/base.entity.ts\");\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\nconst message_entity_1 = __webpack_require__(/*! ../messages/message.entity */ \"./src/components/messages/message.entity.ts\");\nlet Chat = class Chat extends base_entity_1.BaseEntity {\n};\n__decorate([\n    typeorm_1.Column('varchar'),\n    __metadata(\"design:type\", String)\n], Chat.prototype, \"name\", void 0);\n__decorate([\n    typeorm_1.ManyToMany(type => user_entity_1.User),\n    __metadata(\"design:type\", Array)\n], Chat.prototype, \"users\", void 0);\n__decorate([\n    typeorm_1.OneToMany(type => message_entity_1.Message, message => message.chat),\n    __metadata(\"design:type\", Array)\n], Chat.prototype, \"messages\", void 0);\nChat = __decorate([\n    typeorm_1.Entity()\n], Chat);\nexports.Chat = Chat;\n\n\n//# sourceURL=webpack:///./src/components/chats/chat.entity.ts?");

/***/ }),

/***/ "./src/components/chats/chats.module.ts":
/*!**********************************************!*\
  !*** ./src/components/chats/chats.module.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst chats_gateway_1 = __webpack_require__(/*! ./chats.gateway */ \"./src/components/chats/chats.gateway.ts\");\nconst chats_service_1 = __webpack_require__(/*! ./chats.service */ \"./src/components/chats/chats.service.ts\");\nconst chat_entity_1 = __webpack_require__(/*! ./chat.entity */ \"./src/components/chats/chat.entity.ts\");\nconst chats_controller_1 = __webpack_require__(/*! ./chats.controller */ \"./src/components/chats/chats.controller.ts\");\nconst messages_module_1 = __webpack_require__(/*! ../messages/messages.module */ \"./src/components/messages/messages.module.ts\");\nlet ChatsModule = class ChatsModule {\n};\nChatsModule = __decorate([\n    common_1.Module({\n        imports: [\n            messages_module_1.MessagesModule,\n            typeorm_1.TypeOrmModule.forFeature([chat_entity_1.Chat]),\n        ],\n        controllers: [chats_controller_1.ChatsController],\n        providers: [chats_gateway_1.ChatsGateway, chats_service_1.ChatsService],\n    })\n], ChatsModule);\nexports.ChatsModule = ChatsModule;\n\n\n//# sourceURL=webpack:///./src/components/chats/chats.module.ts?");

/***/ }),

/***/ "./src/components/messages/message.entity.ts":
/*!***************************************************!*\
  !*** ./src/components/messages/message.entity.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\nconst chat_entity_1 = __webpack_require__(/*! ../chats/chat.entity */ \"./src/components/chats/chat.entity.ts\");\nlet Message = class Message {\n};\n__decorate([\n    typeorm_1.PrimaryGeneratedColumn(),\n    __metadata(\"design:type\", Number)\n], Message.prototype, \"id\", void 0);\n__decorate([\n    typeorm_1.Column('varchar'),\n    __metadata(\"design:type\", String)\n], Message.prototype, \"text\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], Message.prototype, \"createdAt\", void 0);\n__decorate([\n    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.messages),\n    typeorm_1.JoinColumn(),\n    __metadata(\"design:type\", user_entity_1.User)\n], Message.prototype, \"author\", void 0);\n__decorate([\n    typeorm_1.ManyToOne(type => chat_entity_1.Chat, chat => chat.messages),\n    typeorm_1.JoinColumn(),\n    __metadata(\"design:type\", chat_entity_1.Chat)\n], Message.prototype, \"chat\", void 0);\nMessage = __decorate([\n    typeorm_1.Entity()\n], Message);\nexports.Message = Message;\n\n\n//# sourceURL=webpack:///./src/components/messages/message.entity.ts?");

/***/ })

};