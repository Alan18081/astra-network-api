import {IsNumber} from 'class-validator';

export class RemoveMessageDto {
  @IsNumber() id: number;
}