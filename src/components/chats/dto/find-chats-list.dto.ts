import { ArrayNotEmpty, IsBooleanString, IsNumberString, IsOptional } from 'class-validator';
import { PaginationDto } from '../../core/dto/pagination.dto';

export class FindChatsListDto extends PaginationDto {

  @IsOptional()
  @ArrayNotEmpty()
  ids: number[];

  @IsBooleanString()
  @IsOptional()
  includeMessages?: boolean;

  @IsBooleanString()
  @IsOptional()
  includeUsers?: boolean;

  @IsOptional()
  @IsNumberString()
  userId?: boolean;

}