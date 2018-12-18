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
const cloudinary = require("cloudinary");
const path_1 = require("path");
const util_1 = require("util");
const fs = require("fs");
const config_1 = require("../../config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const file_entity_1 = require("./file.entity");
const common_1 = require("@nestjs/common");
const messages_enum_1 = require("../../helpers/enums/messages.enum");
cloudinary.v2.uploader.upload = util_1.promisify(cloudinary.v2.uploader.upload);
const unlink = util_1.promisify(fs.unlink);
let FilesService = class FilesService {
    constructor(filesRepository) {
        this.filesRepository = filesRepository;
        this.cloudinary = cloudinary;
        this.cloudinary.config({
            cloud_name: config_1.CLOUDINARY_CLOUD_NAME,
            api_key: config_1.CLOUDINARY_API_KEY,
            api_secret: config_1.CLOUDINARY_API_SECRET,
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.filesRepository.findOne(id);
        });
    }
    uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = path_1.join(config_1.FILES_UPLOAD_FOLDER, file.filename);
            const { url, public_id } = yield this.cloudinary.v2.uploader.upload(path);
            yield unlink(path);
            const newFile = Object.assign({}, new file_entity_1.File(), { url, publicId: public_id });
            return yield this.filesRepository.save(newFile);
        });
    }
    uploadFilesList(files) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadedFiles = yield Promise.all(files.map(file => this.cloudinary.v2.uploader.upload(path_1.join(config_1.FILES_UPLOAD_FOLDER, file.filename))));
            return yield this.filesRepository.save(uploadedFiles.map(({ url, public_id }) => {
                return Object.assign({}, new file_entity_1.File(), { url, publicId: public_id });
            }));
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.filesRepository.findOne(id);
            if (!file) {
                throw new common_1.NotFoundException(messages_enum_1.Messages.FILE_NOT_FOUND);
            }
            yield this.cloudinary.v2.uploader.destroy(file.publicId);
            yield this.filesRepository.delete({ id });
        });
    }
};
FilesService = __decorate([
    __param(0, typeorm_1.InjectRepository(file_entity_1.File)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map