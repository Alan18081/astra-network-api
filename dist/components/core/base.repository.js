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
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    findMany(query, skip = 0, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.find(query).skip(skip).limit(limit).exec();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findById(id);
        });
    }
    updateById(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findByIdAndUpdate(id, { $set: payload }, { new: true });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.deleteOne({ _id: id });
        });
    }
    save(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = new this.model(payload);
            return entity.save();
        });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map