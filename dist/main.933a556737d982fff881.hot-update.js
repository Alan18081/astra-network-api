exports.id = "main";
exports.modules = {

/***/ "./src/components/chats/chats.module.ts":
/*!**********************************************!*\
  !*** ./src/components/chats/chats.module.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst chats_gateway_1 = __webpack_require__(/*! ./chats.gateway */ \"./src/components/chats/chats.gateway.ts\");\nconst chats_service_1 = __webpack_require__(/*! ./chats.service */ \"./src/components/chats/chats.service.ts\");\nconst chat_entity_1 = __webpack_require__(/*! ./chat.entity */ \"./src/components/chats/chat.entity.ts\");\nconst chats_controller_1 = __webpack_require__(/*! ./chats.controller */ \"./src/components/chats/chats.controller.ts\");\nconst messages_module_1 = __webpack_require__(/*! ../messages/messages.module */ \"./src/components/messages/messages.module.ts\");\nlet ChatsModule = class ChatsModule {\n};\nChatsModule = __decorate([\n    common_1.Module({\n        imports: [\n            messages_module_1.MessagesModule,\n            typeorm_1.TypeOrmModule.forFeature([chat_entity_1.Chat]),\n        ],\n        controllers: [chats_controller_1.ChatsController],\n        providers: [chats_gateway_1.ChatsGateway, chats_service_1.ChatsService],\n    })\n], ChatsModule);\nexports.ChatsModule = ChatsModule;\n\n\n//# sourceURL=webpack:///./src/components/chats/chats.module.ts?");

/***/ })

};