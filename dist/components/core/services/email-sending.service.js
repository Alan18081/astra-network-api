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
const common_1 = require("@nestjs/common");
const elasticemail = require("elasticemail");
const config_1 = require("../../../config");
let EmailSendingService = class EmailSendingService {
    constructor() {
        this.client = elasticemail.createClient({
            username: config_1.EMAIL_USERNAME,
            apiKey: config_1.EMAIL_API_KEY,
        });
    }
    sendSystemEmail(email, subject, template) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.send({
                    from: config_1.SYSTEM_EMAIL,
                    from_name: config_1.APP_NAME,
                    to: email,
                    subject,
                    body_html: template,
                });
            }
            catch (e) {
                console.log(e);
                throw new common_1.InternalServerErrorException();
            }
        });
    }
    send(config) {
        return new Promise((resolve, reject) => {
            this.client.mailer.send(config, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }
};
EmailSendingService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], EmailSendingService);
exports.EmailSendingService = EmailSendingService;
//# sourceMappingURL=email-sending.service.js.map