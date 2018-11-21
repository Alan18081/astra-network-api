import { IsBooleanString, IsNumberString, IsOptional } from 'class-validator';
import {ApiModelPropertyOptional} from '@nestjs/swagger';

export class FindProductsListDto {

  @IsBooleanString()
  @IsOptional()
  @ApiModelPropertyOptional()
  includeImages?: boolean;

  @IsBooleanString()
  @IsOptional()
  @ApiModelPropertyOptional()
  includeComments?: boolean;

  @IsNumberString()
  @IsOptional()
  @ApiModelPropertyOptional()
  priceFrom?: number;

  @IsNumberString()
  @IsOptional()
  @ApiModelPropertyOptional()
  priceTo?: number;

  @IsNumberString()
  @IsOptional()
  @ApiModelPropertyOptional()
  quantityFrom?: number;

  @IsNumberString()
  @IsOptional()
  @ApiModelPropertyOptional()
  quantityTo?: number;

}