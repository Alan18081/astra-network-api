import { IsEmail, IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiModelProperty()
  firstName: string;

  @IsString()
  @ApiModelProperty()
  lastName: string;

  @IsInt()
  @IsOptional()
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