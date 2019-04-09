import { IsEmail, IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {ConfigService} from '../../core/services/config.service';

const configService = new ConfigService(`${process.env.NODE_ENV}.env`);

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
  @MinLength(+configService.get('PASSWORD_LENGTH'))
  @ApiModelProperty()
  password: string;
}