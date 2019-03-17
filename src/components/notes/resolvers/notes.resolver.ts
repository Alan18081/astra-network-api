import {Resolver, Args, Mutation, ResolveProperty, Parent, Subscription, Query} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Note } from '../interfaces/note.interface';
import { NotesService } from '../notes.service';
import { FindNotesListDto } from '../dto/find-notes-list.dto';
import { User } from '../../users/user.interface';
import { CreateNoteDto } from '../dto/create-note.dto';
import { ReqUser } from '../../../helpers/decorators/user.decorator';
import { UpdateNoteDto } from '../dto/update-note.dto';
import {GqlAuthGuard} from '../../../helpers/guards/auth.guard';
import {UsersService} from '../../users/users.service';
import {Events} from '../../../helpers/enums/events.enum';
import {PublisherService} from '../../core/services/publisher.service';

@Resolver('Note')
@UseGuards(GqlAuthGuard)
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
  async notesList(@Args('input') dto: FindNotesListDto): Promise<Note[]> {
    return this.notesService.findMany(dto);
  }

  @Query('note')
  async findNoteById(@Args('id') id: string): Promise<Note | null> {
    return this.notesService.findOne(id);
  }

  @Mutation('createNote')
  async createNote(@ReqUser() user: User, @Args('input') noteDto: CreateNoteDto): Promise<Note> {
    const note = await this.notesService.createOne(noteDto, user._id);
    await this.publisherService.publish(Events.NOTES_NOTE_ADDED, note);
    return note;
  }

  @Mutation('updateNote')
  async updateNote(@Args('id') id: string, @Args('input') noteDto: UpdateNoteDto): Promise<Note | null> {
    return this.notesService.updateById(id, noteDto);
  }

  @Mutation('deleteNote')
  async deleteNote(@Args('id') id: string): Promise<void> {
    return this.notesService.deleteById(id);
  }

  @Mutation('addLikeToNote')
  async addLikePost(@ReqUser() user: User, @Args('id') id: string): Promise<Note | null> {
    return this.notesService.addLike(id, user._id);
  }

  @Mutation('removeLikeFromNote')
  async removeLikePost(@ReqUser() user: User, @Args('id') id: string): Promise<Note | null> {
    return this.notesService.removeLike(id, user._id);
  }

  @Mutation('addDislikeToNote')
  async addDislikePost(@ReqUser() user: User, @Args('id') id: string): Promise<Note | null> {
      return this.notesService.addDislike(id, user._id);
  }

  @Mutation('removeDislikeFromNote')
  async removeDislikePost(@ReqUser() user: User, @Args('id') id: string): Promise<Note | null> {
      return this.notesService.removeDislike(id, user._id);
  }

  @Subscription('noteAdded')
  async noteAdded() {
    return {
          resolve(payload) {
              return payload;
          },
          subscribe: () => this.publisherService.asyncIterator(Events.NOTES_NOTE_ADDED),
      }
  }
}