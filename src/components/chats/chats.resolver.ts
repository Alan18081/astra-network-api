import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
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
import { PublisherService } from '../core/services/publisher.service';
import { idEqualsFilter } from '../../helpers/handlers/id-equals.filter';
import { Events } from '../../helpers/enums/events.enum';
import { ResolverFn } from 'graphql-subscriptions';
import { GqlAuthGuard } from '../../helpers/guards/auth.guard';

@Resolver('Chat')
@UseGuards(GqlAuthGuard)
export class ChatsResolver {

  constructor(
    private readonly chatsService: ChatsService,
    private readonly publisherService: PublisherService
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
  async updateChat(@Args('id') id: string, @Args('input') chatDto: UpdateChatDto): Promise<Chat | null> {
    return this.chatsService.updateById(id, chatDto);
  }

  @Mutation('deleteChat')
  async deleteChat(@Args('id') id: string): Promise<void> {
    return this.chatsService.deleteById(id);
  }

  @Subscription('userAddedToChat')
  onUserAddedToChat(@Args('id') id: string) {
    return idEqualsFilter(id,() => this.publisherService.asyncIterator(Events.CHATS_USER_ADDED));
  }

  @Subscription('userRemovedFromChat')
  onUserRemovedFromChat(@Args('id') id: string) {
    return idEqualsFilter(id,() => this.publisherService.asyncIterator(Events.CHATS_USER_REMOVED));
  }

  @Subscription('messageAdded')
  onMessageAddedToChat(@Args('id') id: string): ResolverFn {
    return idEqualsFilter(id,() => this.publisherService.asyncIterator(Events.CHATS_MESSAGE_ADDED));
  }

  @Subscription('messageEdited')
  onMessageEditedToChat(@Args('id') id: string): ResolverFn {
    return idEqualsFilter(id,() => this.publisherService.asyncIterator(Events.CHATS_MESSAGE_EDITED));
  }

  @Subscription('messageRemoved')
  onMessageRemovedFromChat(@Args('id') id: string): ResolverFn {
    return idEqualsFilter(id,() => this.publisherService.asyncIterator(Events.CHATS_MESSAGE_REMOVED));
  }
}