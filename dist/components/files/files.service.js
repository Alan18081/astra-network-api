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
const cloudinary = require("cloudinary");
const path_1 = require("path");
const util_1 = require("util");
const fs = require("fs");
const config_1 = require("../../config");
const common_1 = require("@nestjs/common");
const messages_enum_1 = require("../../helpers/enums/messages.enum");
const files_repository_1 = require("./files.repository");
const fs_1 = require("fs");
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
            return this.filesRepository.findById(id);
        });
    }
    saveFile(filename, stream) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const path = path_1.join(config_1.FILES_UPLOAD_FOLDER, filename);
                const writeStream = fs_1.createWriteStream(path);
                stream.pipe(writeStream);
                stream.on('end', () => {
                    resolve(path);
                });
                stream.on('error', err => {
                    reject(err);
                });
            });
        });
    }
    uploadFile(file, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = yield this.saveFile(file.filename, file.createReadStream());
            const { url, public_id } = yield this.cloudinary.v2.uploader.upload(path);
            yield unlink(path);
            const newFile = {
                url,
                publicId: public_id,
                user: userId,
            };
            return this.filesRepository.save(newFile);
        });
    }
    uploadFilesList(files, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadedFiles = yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                const path = yield this.saveFile(file.filename, file.createReadStream());
                const { url, public_id } = yield this.cloudinary.v2.uploader.upload(path);
                yield unlink(path);
                return { url, public_id };
            })));
            return Promise.all(uploadedFiles.map(({ url, public_id }) => this.filesRepository.save({
                url,
                publicId: public_id,
                user: userId,
            })));
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.filesRepository.findById(id);
            if (!file) {
                throw new common_1.NotFoundException(messages_enum_1.Messages.FILE_NOT_FOUND);
            }
            yield this.cloudinary.v2.uploader.destroy(file.publicId);
            yield this.filesRepository.deleteById(id);
        });
    }
};
FilesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [files_repository_1.FilesRepository])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map