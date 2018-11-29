import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ChatsService } from './chats.service';
import { ReqUser } from '../../helpers/decorators/user.decorator';
import { User } from '../users/user.entity';
import { Chat } from './chat.entity';
import { CreateChatDto } from './dto/http/create-chat.dto';
import { FindChatsListDto } from './dto/http/find-chats-list.dto';
import {UpdateChatDto} from './dto/http/update-chat.dto';
import { FindOneChatDto } from './dto/http/find-one-chat.dto';

@Controller('chats')
@UseGuards(AuthGuard('jwt'))
@ApiUseTags('Chats')
@ApiBearerAuth()
export class ChatsController {

  constructor(
    private readonly chatsService: ChatsService,
  ) {}

  @Get()
  @ApiOperation({ title: 'Get list of chats for particular user' })
  async findAll(@Query() query: FindChatsListDto): Promise<Chat[]> {
    if (query.ids) {
      return await this.chatsService.findManyByIds(query);
    } else {
      return await this.chatsService.findMany(query);
    }
  }

  @Get(':id')
  @ApiOperation({ title: 'Get chat by id' })
  async findOne(@Param('id') id: number, @Query() query: FindOneChatDto): Promise<Chat | undefined> {
    return await this.chatsService.findOne(+id, query);
  }

  @Post()
  @ApiOperation({ title: 'Get list of chats for particular user' })
  async createOne(@ReqUser() user: User, @Body() payload: CreateChatDto): Promise<Chat | undefined> {
    payload.userIds.push(user.id);
    return await this.chatsService.createOne(payload);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update particular chat' })
  async updateOne(@Param('id') id: number, @Body() payload: UpdateChatDto): Promise<Chat | undefined> {
    return await this.chatsService.updateOne(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Leave particular chat or delete if no users left' })
  async deleteOne(@ReqUser() user: User, @Param('id') id: number): Promise<void> {
    await this.chatsService.deleteOne(id, user.id);
  }
}