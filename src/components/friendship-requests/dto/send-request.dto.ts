import { IsInt, IsOptional, IsString } from 'class-validator';

export class SendRequestDto {

  @IsInt()
  receiverId: number;

  @IsString()
  @IsOptional()
  message?: string;

}