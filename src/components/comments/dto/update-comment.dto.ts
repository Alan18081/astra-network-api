import { IsString, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCommentDto {

  @IsString()
  @MinLength(1)
  @ApiModelProperty()
  text: string;

}