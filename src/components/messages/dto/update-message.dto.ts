import {IsNumber, IsString} from 'class-validator';

export class UpdateMessageDto {
  @IsNumber()
  messageId: number;

  @IsNumber()
  chatId: number;

  @IsString()
  text: string;
}