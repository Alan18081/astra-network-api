import {IsNumber} from 'class-validator';

export class RemoveMessageDto {
  @IsNumber()
  messageId: number;

  @IsNumber()
  chatId: number;
}