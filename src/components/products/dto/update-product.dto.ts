import {IsNumber, IsOptional, IsString, Min} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class UpdateProductDto {

  @IsString()
  @ApiModelProperty()
  title?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiModelProperty()
  quantity: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiModelProperty()
  price: number;
}