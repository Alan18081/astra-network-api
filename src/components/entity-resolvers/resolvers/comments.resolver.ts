import { Parent, ResolveProperty, Resolver} from '@nestjs/graphql';
import {Comment} from '../../notes/interfaces/comment.interface';
import {UsersService} from '../../users/users.service';

@Resolver('Comment')
export class CommentsResolver {

    constructor(
        private readonly usersService: UsersService,
    ) {}

    @ResolveProperty('author')
    async author(@Parent() comment: Comment) {
        return this.usersService.findOne(comment.author);
    }
}