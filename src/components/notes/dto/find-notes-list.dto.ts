import { ArrayNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class FindNotesListDto {

  @IsOptional()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  ids?: string[];

}