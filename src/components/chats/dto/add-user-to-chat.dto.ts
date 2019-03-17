import {IsMongoId} from 'class-validator';

export class AddUserToChatDto {

    @IsMongoId()
    chatId: string;

    @IsMongoId()
    userId: string;
}