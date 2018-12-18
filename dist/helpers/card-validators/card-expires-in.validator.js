"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cardValidator = require("card-validator");
class CardExpiresInValidator {
    validate(value, validationArguments) {
        const { isValid } = cardValidator.expiresIn(value);
        return isValid;
    }
}
exports.CardExpiresInValidator = CardExpiresInValidator;
//# sourceMappingURL=card-expires-in.validator.js.map