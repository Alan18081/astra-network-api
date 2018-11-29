import {IsNumber} from 'class-validator';

export class RemoveUserDto {

  @IsNumber()
  userId: number;

  @IsNumber()
  chatId: number;

}