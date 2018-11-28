import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ChatsService } from './chats.service';
import { ReqUser } from '../../helpers/decorators/user.decorator';
import { User } from '../users/user.entity';
import { Chat } from './chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { FindChatsListDto } from './dto/find-chats-list.dto';

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
      return await this.chatsService.findManyByIds();
    } else {
      return await this.chatsService.findMany(query);
    }
  }

  @Post()
  @ApiOperation({ title: 'Get list of chats for particular user' })
  async createOne(@ReqUser() user: User, @Body() payload: CreateChatDto): Promise<Chat | undefined> {
    payload.userIds.push(user.id);
    return await this.chatsService.createOne(payload);
  }
}