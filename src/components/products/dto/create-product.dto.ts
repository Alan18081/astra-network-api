import { IsNumber, IsOptional, IsString, Min, IsInt } from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @ApiModelProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  description: string;

  @IsNumber()
  @ApiModelProperty()
  mainImageId: number;

  @IsInt()
  @Min(0)
  @ApiModelProperty()
  quantity: number;

  @IsNumber()
  @ApiModelProperty()
  price: number;
}