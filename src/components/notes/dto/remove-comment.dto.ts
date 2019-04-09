import {IsMongoId} from 'class-validator';

export class RemoveCommentDto {

    @IsMongoId()
    noteId: string;

    @IsMongoId()
    commentId: string;

}