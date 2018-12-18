"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockRepository = {
    find() {
        return __awaiter(this, void 0, void 0, function* () { });
    },
    findAndCount() {
        return __awaiter(this, void 0, void 0, function* () { });
    },
    findOne() {
        return __awaiter(this, void 0, void 0, function* () { });
    },
    update() {
        return __awaiter(this, void 0, void 0, function* () { });
    },
    save() {
        return __awaiter(this, void 0, void 0, function* () { });
    },
    delete() {
        return __awaiter(this, void 0, void 0, function* () { });
    },
    createQueryBuilder() {
        return 'builder';
    }
};
//# sourceMappingURL=mock-repository.js.map