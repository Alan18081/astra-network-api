import { ArrayNotEmpty, IsBooleanString, IsNumberString, IsOptional } from 'class-validator';
import { PaginationDto } from '../../core/dto/pagination.dto';

export class FindNotesListDto extends PaginationDto {

  @IsOptional()
  @ArrayNotEmpty()
  ids: number[];

  @IsBooleanString()
  @IsOptional()
  includeFiles?: boolean;

  @IsOptional()
  @IsNumberString()
  userId?: boolean;

}