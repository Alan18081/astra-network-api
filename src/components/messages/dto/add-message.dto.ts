import { IsMongoId, IsString } from 'class-validator';

export class AddMessageDto {
  @IsString()
  text: string;

  @IsMongoId()
  chatId: string;
}