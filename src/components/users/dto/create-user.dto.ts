import {IsEmail, IsNumber, IsString, MinLength} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateUserDto {

  @IsString()
  @ApiModelProperty()
  firstName: string;

  @IsString()
  @ApiModelProperty()
  lastName: string;

  @IsNumber()
  @ApiModelProperty()
  age: number;

  @IsEmail()
  @ApiModelProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @ApiModelProperty()
  password: string;

}