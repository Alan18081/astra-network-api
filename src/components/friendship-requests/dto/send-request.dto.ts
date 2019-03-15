import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class SendRequestDto {

  @IsMongoId()
  receiverId: string;

  @IsString()
  @IsOptional()
  message?: string;

}