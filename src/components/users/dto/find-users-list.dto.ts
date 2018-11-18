import {IsBooleanString, IsNumberString, IsOptional} from 'class-validator';

export class FindUsersListDto {
  @IsNumberString()
  @IsOptional()
  ageFrom?: number;

  @IsNumberString()
  @IsOptional()
  ageTo?: number;

  @IsBooleanString()
  @IsOptional()
  onlySellers?: boolean;

}