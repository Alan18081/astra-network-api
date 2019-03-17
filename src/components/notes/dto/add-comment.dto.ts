import {IsMongoId, IsString} from 'class-validator';

export class AddCommentDto {

    @IsMongoId()
    noteId: string;

    @IsString()
    text: string;

}