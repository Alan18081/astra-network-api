import { ArrayNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @ArrayNotEmpty()
  @IsOptional()
  fileIds: number[];

}