exports.id = "main";
exports.modules = {

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst users_module_1 = __webpack_require__(/*! ./components/users/users.module */ \"./src/components/users/users.module.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst config_1 = __webpack_require__(/*! ./config */ \"./src/config/index.ts\");\nconst auth_module_1 = __webpack_require__(/*! ./components/auth/auth.module */ \"./src/components/auth/auth.module.ts\");\nconst files_module_1 = __webpack_require__(/*! ./components/files/files.module */ \"./src/components/files/files.module.ts\");\nconst orders_module_1 = __webpack_require__(/*! ./components/orders/orders.module */ \"./src/components/orders/orders.module.ts\");\nconst messages_module_1 = __webpack_require__(/*! ./components/messages/messages.module */ \"./src/components/messages/messages.module.ts\");\nconst chats_module_1 = __webpack_require__(/*! ./components/chats/chats.module */ \"./src/components/chats/chats.module.ts\");\nlet AppModule = class AppModule {\n};\nAppModule = __decorate([\n    common_1.Module({\n        imports: [\n            typeorm_1.TypeOrmModule.forRoot(config_1.ORM_CONFIG),\n            users_module_1.UsersModule,\n            auth_module_1.AuthModule,\n            files_module_1.FilesModule,\n            orders_module_1.OrdersModule,\n            messages_module_1.MessagesModule,\n            chats_module_1.ChatsModule,\n        ],\n        controllers: [],\n        providers: [],\n    })\n], AppModule);\nexports.AppModule = AppModule;\n\n\n//# sourceURL=webpack:///./src/app.module.ts?");

/***/ }),

/***/ "./src/components/messages/messages.module.ts":
/*!****************************************************!*\
  !*** ./src/components/messages/messages.module.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst messages_service_1 = __webpack_require__(/*! ./messages.service */ \"./src/components/messages/messages.service.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst message_entity_1 = __webpack_require__(/*! ./message.entity */ \"./src/components/messages/message.entity.ts\");\nconst messages_gateway_1 = __webpack_require__(/*! ./messages.gateway */ \"./src/components/messages/messages.gateway.ts\");\nlet MessagesModule = class MessagesModule {\n};\nMessagesModule = __decorate([\n    common_1.Module({\n        imports: [\n            typeorm_1.TypeOrmModule.forFeature([message_entity_1.Message]),\n        ],\n        controllers: [],\n        exports: [messages_service_1.MessagesService],\n        providers: [messages_service_1.MessagesService, messages_gateway_1.MessagesGateway],\n    })\n], MessagesModule);\nexports.MessagesModule = MessagesModule;\n\n\n//# sourceURL=webpack:///./src/components/messages/messages.module.ts?");

/***/ })

};