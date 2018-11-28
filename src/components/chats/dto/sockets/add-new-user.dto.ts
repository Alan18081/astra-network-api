import {IsNumber} from 'class-validator';

export class AddNewUserDto {

  @IsNumber()
  userId: number;

  @IsNumber()
  chatId: number;

}