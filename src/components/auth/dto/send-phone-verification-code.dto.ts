import { IsString } from 'class-validator';

export class SendPhoneVerificationCodeDto {

  @IsString()
  countryCode: string;

  @IsString()
  phone: string;

}