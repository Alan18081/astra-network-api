import {ArrayNotEmpty, IsMongoId, IsOptional} from 'class-validator';
import { PaginationDto } from '../../core/dto/pagination.dto';

export class FindNotesListDto extends PaginationDto {

  @IsOptional()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  ids?: string[];

}