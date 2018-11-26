import { IsEmail } from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class VerifyEmailDto {

  @IsEmail()
  @ApiModelProperty()
  email: string;

}