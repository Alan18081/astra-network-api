"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cardValidator = require("card-validator");
class CardCvvValidator {
    validate(value, validationArguments) {
        const { isValid } = cardValidator.cvv(value);
        return isValid;
    }
}
exports.CardCvvValidator = CardCvvValidator;
//# sourceMappingURL=card-cvv.validator.js.map