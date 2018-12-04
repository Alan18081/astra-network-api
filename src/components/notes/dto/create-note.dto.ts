import { ArrayNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ArrayNotEmpty()
  @IsOptional()
  fileIds?: number[];

}