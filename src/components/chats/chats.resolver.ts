import { Resolver, Query, Mutation, Args,  } from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReqUser } from '../../helpers/decorators/user.decorator';
import { User } from '../users/user.interface';
import { FindOneChatDto } from './dto/http/find-one-chat.dto';
import { Chat } from './chat.interface';
import { FindChatsListDto } from './dto/http/find-chats-list.dto';
import { CreateChatDto } from './dto/http/create-chat.dto';
import { UpdateChatDto } from './dto/http/update-chat.dto';

@Resolver('Chat')
@UseGuards(AuthGuard('jwt'))
export class ChatsResolver {

  constructor(
    private readonly chatsService: ChatsService
  ) {}
  @Query('findManyByUser')
  async findManyByUser(@Args('input') dto: FindChatsListDto): Promise<Chat[]> {
    return this.chatsService.findMany(dto);
  }

  @Query('findChatById')
  async findChatById(@Args('id') id: string, @Args('params') params: FindOneChatDto): Promise<Chat | null> {
    return this.chatsService.findOne(id, params);
  }

  @Mutation('createChat')
  async createChat(@ReqUser() user: User, @Args('input') chatDto: CreateChatDto): Promise<Chat> {
    return this.chatsService.createOne(chatDto);
  }

  @Mutation('updateChat')
  @UseGuards(AuthGuard('jwt'))
  async updateChat(@Args('id') id: string, @Args('input') chatDto: UpdateChatDto): Promise<Chat | null> {
    return this.chatsService.updateById(id, chatDto);
  }

  @Mutation('deleteChat')
  @UseGuards(AuthGuard('jwt'))
  async deleteChat(@Args('id') id: string): Promise<void> {
    return this.chatsService.deleteById(id);
  }
}