import { ArrayNotEmpty, IsBooleanString, IsMongoId, IsOptional } from 'class-validator';
import { PaginationDto } from '../../core/dto/pagination.dto';

export class FindNotesListDto extends PaginationDto {

  @IsOptional()
  @ArrayNotEmpty()
  ids?: string[];

  @IsBooleanString()
  @IsOptional()
  includeFiles?: boolean;

  @IsOptional()
  @IsMongoId()
  userId?: boolean;

}