import {IsNumber, IsOptional, IsString, Min} from 'class-validator';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';

export class UpdateProductDto {

  @IsString()
  @ApiModelProperty()
  title?: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiModelPropertyOptional()
  quantity?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiModelPropertyOptional()
  price?: number;
}