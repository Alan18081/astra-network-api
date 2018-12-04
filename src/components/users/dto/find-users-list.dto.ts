import {IsBooleanString, IsNumberString, IsOptional} from 'class-validator';
import { PaginationDto } from '../../core/dto/pagination.dto';

export class FindUsersListDto extends PaginationDto {
  @IsNumberString()
  @IsOptional()
  ageFrom?: number;

  @IsNumberString()
  @IsOptional()
  ageTo?: number;

}