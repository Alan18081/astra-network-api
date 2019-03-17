import {Args, Mutation, Parent, ResolveProperty, Resolver} from '@nestjs/graphql';
import {UsersService} from '../../users/users.service';
import {Answer} from '../interfaces/answer.interface';
import {User} from '../../users/user.interface';
import {NotesService} from '../notes.service';
import {ReqUser} from '../../../helpers/decorators/user.decorator';
import {Note} from '../interfaces/note.interface';
import {AddAnswerDto} from '../dto/add-answer.dto';

@Resolver('Answer')
export class AnswersResolver {

    constructor(
        private readonly usersService: UsersService,
        private readonly notesService: NotesService,
    ) {}

    @ResolveProperty('author')
    async author(@Parent() answer: Answer): Promise<User | null> {
        return this.usersService.findOne(answer._id);
    }

    @Mutation('addAnswerToComment')
    async addAnswerToComment(@ReqUser() user: User, @Args('input') dto: AddAnswerDto): Promise<Note | null> {
        return this.notesService.addAnswerToComment(user._id, dto);
    }
}