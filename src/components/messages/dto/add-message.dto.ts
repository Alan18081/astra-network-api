import {IsNumber, IsString} from 'class-validator';

export class AddMessageDto {
  @IsString() text: string;
  @IsNumber() chatId: number;
}