import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class FindOneMessageDto {

  @IsBoolean()
  @IsOptional()
  includeUser?: boolean;

}