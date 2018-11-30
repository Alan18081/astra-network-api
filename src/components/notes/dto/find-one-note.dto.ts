import { IsBooleanString, IsOptional } from 'class-validator';

export class FindOneNoteDto {

  @IsBooleanString()
  @IsOptional()
  includeFiles?: boolean;

}