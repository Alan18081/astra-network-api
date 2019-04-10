import { IsString } from 'class-validator';

export class VerifyPhoneVerificationCodeDto {

  @IsString()
  code: string;

}