import { UsersService } from '../../users/users.service';
import { Answer } from '../../notes/interfaces/answer.interface';
import { User } from '../../users/user.interface';
export declare class AnswersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    author(answer: Answer): Promise<User | null>;
}
