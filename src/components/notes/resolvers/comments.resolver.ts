import {Args, Mutation, Parent, ResolveProperty, Resolver} from '@nestjs/graphql';
import {Comment} from '../interfaces/comment.interface';
import {UsersService} from '../../users/users.service';
import {ReqUser} from '../../../helpers/decorators/user.decorator';
import {User} from '../../users/user.interface';
import {AddCommentDto} from '../dto/add-comment.dto';
import {Note} from '../interfaces/note.interface';
import {NotesService} from '../notes.service';
import {RemoveCommentDto} from '../dto/remove-comment.dto';

@Resolver('Comment')
export class CommentsResolver {

    constructor(
        private readonly usersService: UsersService,
        private readonly notesService: NotesService,
    ) {}

    @ResolveProperty('author')
    async author(@Parent() comment: Comment) {
        return this.usersService.findOne(comment.author);
    }

    @Mutation('addComment')
    async addComment(@ReqUser() user: User, @Args('input') dto: AddCommentDto): Promise<Note | null> {
        return this.notesService.addComment(user._id, dto);
    }

    @Mutation('removeComment')
    async removeComment(@ReqUser() user: User, @Args('input') dto: RemoveCommentDto): Promise<Note | null> {
        return this.notesService.removeComment(user._id, dto);
    }
}