import { IsInt } from 'class-validator';

export class RemoveRequestDto {

  @IsInt()
  id: number;

  @IsInt()
  receiverId: number;

}