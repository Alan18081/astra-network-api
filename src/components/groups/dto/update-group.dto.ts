import { IsOptional, IsString } from 'class-validator';

export class UpdateGroupDto {

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

}