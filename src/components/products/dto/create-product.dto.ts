import {IsNumber, IsOptional, IsString, Min} from 'class-validator';
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
  @Min(0)
  quantity: string;

  @IsNumber()
  @Min(0)
  price: number;
}