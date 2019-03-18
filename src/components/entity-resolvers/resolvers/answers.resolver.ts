import { Parent, ResolveProperty, Resolver} from '@nestjs/graphql';
import {UsersService} from '../../users/users.service';
import {Answer} from '../../notes/interfaces/answer.interface';
import {User} from '../../users/user.interface';

@Resolver('Answer')
export class AnswersResolver {

    constructor(
        private readonly usersService: UsersService,
    ) {}

    @ResolveProperty('author')
    async author(@Parent() answer: Answer): Promise<User | null> {
        return this.usersService.findOne(answer._id);
    }

}