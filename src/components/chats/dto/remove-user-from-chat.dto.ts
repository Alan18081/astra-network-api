import {IsMongoId} from 'class-validator';

export class RemoveUserFromChatDto {

    @IsMongoId()
    chatId: string;

    @IsMongoId()
    userId: string;

}