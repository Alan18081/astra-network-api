import { IsInt } from 'class-validator';

export class RemoveUserDto {

  @IsInt()
  userId: number;

  @IsInt()
  chatId: number;

}