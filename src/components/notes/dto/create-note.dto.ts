import { ArrayNotEmpty, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ArrayNotEmpty()
  @IsOptional()
  @IsMongoId({ each: true })
  fileIds?: string[];

}