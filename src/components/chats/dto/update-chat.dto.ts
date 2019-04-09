import { IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateChatDto {

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  name: string;

}