import {IsEmail, IsString, MinLength} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiModelProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @ApiModelProperty()
  password: string;
}