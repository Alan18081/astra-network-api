import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class CardExpiresInValidator implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean;
}
