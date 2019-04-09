import { Comment } from '../interfaces/comment.interface';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.interface';
import { AddCommentDto } from '../dto/add-comment.dto';
import { Note } from '../interfaces/note.interface';
import { NotesService } from '../notes.service';
import { RemoveCommentDto } from '../dto/remove-comment.dto';
export declare class CommentsResolver {
    private readonly usersService;
    private readonly notesService;
    constructor(usersService: UsersService, notesService: NotesService);
    author(comment: Comment): Promise<User>;
    addComment(user: User, dto: AddCommentDto): Promise<Note | null>;
    removeComment(user: User, dto: RemoveCommentDto): Promise<Note | null>;
}
