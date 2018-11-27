import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class CardCvvValidator implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean;
}
