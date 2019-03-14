import { IsArray, IsString } from 'class-validator';
import {ApiModelProperty } from '@nestjs/swagger';

export class CreateChatDto {

  @IsString()
  @ApiModelProperty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  userIds: string[];

}