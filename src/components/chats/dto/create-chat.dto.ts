import { IsArray, IsMongoId, IsString } from 'class-validator';
import {ApiModelProperty } from '@nestjs/swagger';

export class CreateChatDto {

  @IsString()
  @ApiModelProperty()
  name: string;

  @IsArray()
  @IsMongoId({ each: true })
  userIds: string[];

}