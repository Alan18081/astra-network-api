import { Comment } from '../../notes/interfaces/comment.interface';
import { UsersService } from '../../users/users.service';
export declare class CommentsResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    author(comment: Comment): Promise<import("../../users/user.interface").User>;
}
