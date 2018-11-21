import { IsInt, IsString, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCommentDto {

  @IsString()
  @MinLength(1)
  @ApiModelProperty()
  text: string;

  @IsInt()
  @ApiModelProperty()
  productId: number;

}