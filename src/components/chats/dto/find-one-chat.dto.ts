import { IsBooleanString, IsOptional } from 'class-validator';

export class FindOneChatDto {

  @IsBooleanString()
  @IsOptional()
  includeMessages?: boolean;

  @IsBooleanString()
  @IsOptional()
  includeUsers?: boolean;

}