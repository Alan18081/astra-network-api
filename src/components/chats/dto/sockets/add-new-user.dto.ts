import {IsNumber} from 'class-validator';

export class AddNewUserDto {

  @IsNumber()
  chatId: number;

}