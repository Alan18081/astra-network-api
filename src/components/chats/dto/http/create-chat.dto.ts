import { IsArray, IsString, IsInt } from 'class-validator';
import {ApiModelProperty } from '@nestjs/swagger';

export class CreateChatDto {

  @IsString()
  @ApiModelProperty()
  name: string;

  @IsArray()
  @IsInt({ each: true })
  userIds: number[];

}