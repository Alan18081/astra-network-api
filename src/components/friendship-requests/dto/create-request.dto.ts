import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateRequestDto {

  @IsMongoId()
  receiverId: string;

  @IsString()
  @IsOptional()
  message?: string;

}