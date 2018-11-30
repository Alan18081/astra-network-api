import { IsInt } from 'class-validator';

export class AddNewUserDto {

  @IsInt()
  chatId: number;

}