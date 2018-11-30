import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { NotesService } from './notes.service';
import { ReqUser } from '../../helpers/decorators/user.decorator';
import { User } from '../users/user.entity';
import { Note } from './note.entity';
import { FindNotesListDto } from './dto/find-notes-list.dto';
import { FindOneGroupDto } from './dto/find-one-note.dto';
import { UpdateGroupDto } from './dto/update-note.dto';
import { CreateGroupDto } from './dto/create-note.dto';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {

  constructor(private readonly notesService: NotesService) {}

  @Get()
  @ApiOperation({ title: 'Get list of notes for particular user' })
  async findAll(@Query() query: FindNotesListDto): Promise<Note[]> {
    if (query.ids) {
      return await this.notesService.findManyByIds(query);
    } else {
      return await this.notesService.findMany(query);
    }
  }

  @Get(':id')
  @ApiOperation({ title: 'Get note by id' })
  async findOne(@Param('id') id: number, @Query() query: FindOneGroupDto): Promise<Note | undefined> {
    return await this.notesService.findOne(+id, query);
  }

  @Post()
  @ApiOperation({ title: 'Create new note' })
  async createOne(@ReqUser() user: User, @Body() payload: CreateGroupDto): Promise<Note | undefined> {
    return await this.notesService.createOne(payload, user.id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update particular note' })
  async updateOne(@Param('id') id: number, @Body() payload: UpdateGroupDto): Promise<Note | undefined> {
    return await this.notesService.updateOne(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete particular note by id' })
  async deleteOne(@ReqUser() user: User, @Param('id') id: number): Promise<void> {
    await this.notesService.deleteOne(id);
  }
}