import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Query, UseGuards } from '@nestjs/common';
import { Note } from './note.interface';
import { NotesService } from './notes.service';
import { FindNotesListDto } from './dto/find-notes-list.dto';
import { User } from '../users/user.interface';
import { CreateNoteDto } from './dto/create-note.dto';
import { ReqUser } from '../../helpers/decorators/user.decorator';
import { UpdateNoteDto } from './dto/update-note.dto';

@Resolver('note')
export class NotesResolver {

  constructor(
    private readonly notesService: NotesService
  ) {}


  @Query('getNotesByUser')
  async getNotesByUser(@Args('input') dto: FindNotesListDto): Promise<Note[]> {
    return this.notesService.findMany(dto);
  }

  @Query('getNoteById')
  async getNoteById(@Args('id') id: string): Promise<Note | null> {
    return this.notesService.findOne(id);
  }

  @Mutation('createNote')
  async createNote(@ReqUser() user: User, @Args('input') noteDto: CreateNoteDto): Promise<Note> {
    return this.notesService.createOne(noteDto, user._id);
  }

  @Mutation('updateNote')
  @UseGuards(AuthGuard('jwt'))
  async updateNote(@Args('id') id: string, @Args('input') noteDto: UpdateNoteDto): Promise<Note | null> {
    return this.notesService.updateById(id, noteDto);
  }

  @Mutation('deleteUser')
  @UseGuards(AuthGuard('jwt'))
  async deleteNote(@Args('id') id: string): Promise<void> {
    return this.notesService.deleteById(id);
  }
}