"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.ReqUser = common_1.createParamDecorator((data, [root, args, ctx, info]) => ctx.user);
//# sourceMappingURL=user.decorator.js.map