import { UsersService } from '../../users/users.service';
import { Answer } from '../interfaces/answer.interface';
import { User } from '../../users/user.interface';
import { NotesService } from '../notes.service';
import { Note } from '../interfaces/note.interface';
import { AddAnswerDto } from '../dto/add-answer.dto';
export declare class AnswersResolver {
    private readonly usersService;
    private readonly notesService;
    constructor(usersService: UsersService, notesService: NotesService);
    author(answer: Answer): Promise<User | null>;
    addAnswerToComment(user: User, dto: AddAnswerDto): Promise<Note | null>;
}
