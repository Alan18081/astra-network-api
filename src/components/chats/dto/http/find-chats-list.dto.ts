import { ArrayNotEmpty, IsBooleanString, IsNumberString, IsOptional } from 'class-validator';
import { PaginationDto } from '../../../core/dto/pagination.dto';

export class FindChatsListDto extends PaginationDto {

  @IsOptional()
  @ArrayNotEmpty()
  ids?: string[];

  @IsBooleanString()
  @IsOptional()
  includeMessages?: boolean;

  @IsBooleanString()
  @IsOptional()
  includeUsers?: boolean;

  @IsOptional()
  @IsNumberString()
  userId: number;

}