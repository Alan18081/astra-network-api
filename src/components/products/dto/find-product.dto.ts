import { IsBooleanString, IsNumberString, IsOptional } from 'class-validator';
import {ApiModelPropertyOptional} from '@nestjs/swagger';

export class FindProductDto {

  @IsBooleanString()
  @IsOptional()
  @ApiModelPropertyOptional()
  includeImages?: boolean;

  @IsBooleanString()
  @IsOptional()
  @ApiModelPropertyOptional()
  includeComments?: boolean;

}