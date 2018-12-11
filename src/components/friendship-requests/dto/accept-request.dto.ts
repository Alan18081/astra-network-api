import { IsInt } from 'class-validator';

export class AcceptRequestDto {

  @IsInt()
  id: number;

}