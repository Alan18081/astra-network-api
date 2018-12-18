"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const template_types_enum_1 = require("../../../helpers/enums/template-types.enum");
const pug_1 = require("pug");
const path_1 = require("path");
const config_1 = require("../../../config");
let EmailTemplatesService = class EmailTemplatesService {
    getTemplate(type, data) {
        switch (type) {
            case template_types_enum_1.TemplateTypes.EMAIL_VERIFICATION:
                return this.renderTemplate('email-verification')(data);
            case template_types_enum_1.TemplateTypes.RESET_PASSWORD:
                return this.renderTemplate('reset-password')(data);
        }
    }
    renderTemplate(filename) {
        return pug_1.compileFile(path_1.join(config_1.EMAIL_TEMPLATES_FOLDER, `${filename}.pug`));
    }
    createSubject(title) {
        return `${config_1.APP_NAME} ${title}`;
    }
};
EmailTemplatesService = __decorate([
    common_1.Injectable()
], EmailTemplatesService);
exports.EmailTemplatesService = EmailTemplatesService;
//# sourceMappingURL=email-templates.service.js.map