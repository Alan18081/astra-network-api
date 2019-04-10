import { ArrayNotEmpty, IsMongoId, IsOptional, IsString, IsDateString } from 'class-validator';

export class FindNotesListDto {

  @IsOptional()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  ids?: string[];

  @IsOptional()
  @IsString()
  query: string;

  @IsOptional()
  @IsDateString()
  dateFrom: string;

  @IsOptional()
  @IsDateString()
  dateTo: string;

}