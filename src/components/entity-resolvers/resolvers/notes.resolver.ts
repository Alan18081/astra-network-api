import {Resolver, Args, Mutation, ResolveProperty, Parent, Subscription, Query} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Note } from '../../notes/interfaces/note.interface';
import { NotesService } from '../../notes/notes.service';
import { FindNotesListDto } from '../../notes/dto/find-notes-list.dto';
import { User } from '../../users/user.interface';
import { CreateNoteDto } from '../../notes/dto/create-note.dto';
import { ReqUser } from '../../../helpers/decorators/user.decorator';
import { UpdateNoteDto } from '../../notes/dto/update-note.dto';
import {GqlAuthGuard} from '../../../helpers/guards/auth.guard';
import {UsersService} from '../../users/users.service';
import {Events} from '../../../helpers/enums/events.enum';
import {PublisherService} from '../../core/services/publisher.service';
import { AddCommentDto } from '../../notes/dto/add-comment.dto';
import { RemoveCommentDto } from '../../notes/dto/remove-comment.dto';
import { AddAnswerDto } from '../../notes/dto/add-answer.dto';
import { withFilter } from 'graphql-subscriptions';

@Resolver('Note')
export class NotesResolver {

  constructor(
    private readonly notesService: NotesService,
    private readonly usersService: UsersService,
    private readonly publisherService: PublisherService,
  ) {}

  @ResolveProperty('author')
  async author(@Parent() note: Note): Promise<User | null> {
    return this.usersService.findOne(note.author);
  }

  @Query('notesList')
  @UseGuards(GqlAuthGuard)
  async notesList(
    @Args('input') dto: FindNotesListDto,
    @Args('skip') skip: number = 0,
    @Args('limit') limit: number = 10
  ): Promise<Note[]> {
    return this.notesService.findMany(dto, skip, limit);
  }

  @Query('note')
  @UseGuards(GqlAuthGuard)
  async findNoteById(@Args('id') id: string): Promise<Note | null> {
    return this.notesService.findOne(id);
  }

  @Mutation('createNote')
  @UseGuards(GqlAuthGuard)
  async createNote(@ReqUser() user: User, @Args('input') noteDto: CreateNoteDto): Promise<Note> {
    const note = await this.notesService.createOne(noteDto, user._id);
    await this.publisherService.publish(Events.NOTES_NOTE_ADDED, note);
    return note;
  }

  @Mutation('updateNote')
  @UseGuards(GqlAuthGuard)
  async updateNote(@Args('id') id: string, @Args('input') noteDto: UpdateNoteDto): Promise<Note | null> {
    const note = await this.notesService.updateById(id, noteDto);
    if(note) {
      await this.publisherService.publish(Events.NOTES_NOTE_UPDATED, note);
    }
    return note;
  }

  @Mutation('deleteNote')
  @UseGuards(GqlAuthGuard)
  async deleteNote(@Args('id') id: string): Promise<void> {
    await this.notesService.deleteById(id);
    await this.publisherService.publish(Events.NOTES_NOTE_DELETED, id);
  }

  @Mutation('addLikeToNote')
  @UseGuards(GqlAuthGuard)
  async addLikePost(@ReqUser() user: User, @Args('id') id: string): Promise<Note | null> {
    return this.notesService.addLike(id, user._id);
  }

  @Mutation('removeLikeFromNote')
  @UseGuards(GqlAuthGuard)
  async removeLikePost(@ReqUser() user: User, @Args('id') id: string): Promise<Note | null> {
    return this.notesService.removeLike(id, user._id);
  }

  @Mutation('addDislikeToNote')
  @UseGuards(GqlAuthGuard)
  async addDislikePost(@ReqUser() user: User, @Args('id') id: string): Promise<Note | null> {
      return this.notesService.addDislike(id, user._id);
  }

  @Mutation('removeDislikeFromNote')
  @UseGuards(GqlAuthGuard)
  async removeDislikePost(@ReqUser() user: User, @Args('id') id: string): Promise<Note | null> {
      return this.notesService.removeDislike(id, user._id);
  }

  @Mutation('addComment')
  @UseGuards(GqlAuthGuard)
  async addComment(@ReqUser() user: User, @Args('input') dto: AddCommentDto): Promise<Note | null> {
    return this.notesService.addComment(user._id, dto);
  }

  @Mutation('removeComment')
  @UseGuards(GqlAuthGuard)
  async removeComment(@ReqUser() user: User, @Args('input') dto: RemoveCommentDto): Promise<Note | null> {
    return this.notesService.removeComment(user._id, dto);
  }

  @Mutation('addAnswerToComment')
  @UseGuards(GqlAuthGuard)
  async addAnswerToComment(@ReqUser() user: User, @Args('input') dto: AddAnswerDto): Promise<Note | null> {
    return this.notesService.addAnswerToComment(user._id, dto);
  }

  @Subscription('noteAdded')
  noteAdded() {
    return {
          resolve(payload) {
              return payload;
          },
          subscribe: () => this.publisherService.asyncIterator(Events.NOTES_NOTE_ADDED),
      }
  }

  @Subscription('noteUpdated')
  noteUpdated() {
    return {
      resolve(payload) {
        return payload;
      },
      subscribe: withFilter(
        () => this.publisherService.asyncIterator(Events.NOTES_NOTE_UPDATED),
        (payload: Note, { id }) => {
          return payload._id.toString() === id;
        }
      )
    }
  }

  @Subscription('noteDeleted')
  noteDeleted() {
    return {
      resolve(payload) {
        return payload;
      },
      subscribe: withFilter(
        () => this.publisherService.asyncIterator(Events.NOTES_NOTE_DELETED),
        (payload: string, { id }) => {
          return payload === id;
        }
      )
    }
  }
}