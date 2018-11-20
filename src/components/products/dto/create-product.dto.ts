import { IsNumber, IsOptional, IsString, Min, IsInstance, IsInt } from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import { File } from '../../files/file.entity';

export class CreateProductDto {
  @IsString()
  @ApiModelProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  description: string;

  @IsInstance(File)
  @ApiModelProperty()
  mainImage: File;

  @IsInt()
  @Min(0)
  @ApiModelProperty()
  quantity: number;

  @IsNumber()
  @ApiModelProperty()
  price: number;
}