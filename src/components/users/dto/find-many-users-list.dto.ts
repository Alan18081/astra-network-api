import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { Gender } from '../../../helpers/enums/gender.enum';

export class FindManyUsersListDto extends PaginationDto {

  @IsNumber()
  @IsOptional()
  ageFrom?: number;

  @IsNumber()
  @IsOptional()
  ageTo?: number;

  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @IsOptional()
  @IsString()
  query: string;

}