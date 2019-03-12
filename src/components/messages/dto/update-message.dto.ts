import {IsString} from 'class-validator';

export class UpdateMessageDto {
  @IsString()
  messageId: string;

  @IsString()
  text: string;
}