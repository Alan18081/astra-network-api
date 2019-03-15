import { IsMongoId } from 'class-validator';

export class RemoveRequestDto {

  @IsMongoId()
  id: string;

  @IsMongoId()
  receiverId: string;

}