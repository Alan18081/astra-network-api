import { IsString, MinLength } from 'class-validator';
import { ConfigService } from '../../core/services/config.service';

const configService = new ConfigService(`${process.env.NODE_ENV}.env`);

export class ChangePasswordDto {

  @IsString()
  @MinLength(+configService.get('PASSWORD_LENGTH'))
  oldPassword: string;

  @IsString()
  @MinLength(+configService.get('PASSWORD_LENGTH'))
  newPassword: string;

}