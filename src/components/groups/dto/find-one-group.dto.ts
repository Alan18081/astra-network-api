import { IsBooleanString, IsOptional } from 'class-validator';

export class FindOneGroupDto {

  @IsBooleanString()
  @IsOptional()
  includeFiles?: boolean;

}