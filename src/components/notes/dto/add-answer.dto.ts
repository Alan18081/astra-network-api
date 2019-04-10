import {IsMongoId, IsString} from 'class-validator';

export class AddAnswerDto {

    @IsMongoId()
    noteId: string;

    @IsMongoId()
    commentId: string;

    @IsString()
    text: string;

}