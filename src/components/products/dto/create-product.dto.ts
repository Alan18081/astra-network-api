import { IsNumber, IsNumberString, IsOptional, IsString, Min, IsInstance, IsInt } from 'class-validator';
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
  mainImage: string;

  @IsInt()
  @ApiModelProperty()
  quantity: number;

  @IsNumberString()
  // @Min(0)
  @ApiModelProperty()
  price: number;
}