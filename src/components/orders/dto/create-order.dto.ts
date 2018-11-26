import { ArrayNotEmpty, IsCreditCard, IsDate, IsNumber, Validate } from 'class-validator';
import { CardCvvValidator } from '../../../helpers/card-validators/card-cvv.validator';
import { CardExpiresInValidator } from '../../../helpers/card-validators/card-expires-in.validator';

export class CreateOrderDto {

  @IsCreditCard()
  cardNumber: number;

  @IsNumber()
  @Validate(CardCvvValidator)
  cvv: number;

  @IsDate()
  @Validate(CardExpiresInValidator)
  expiresIn: Date;

  @ArrayNotEmpty()
  productIds: number[];

}