import { Resolver, Query, Mutation, Args, Subscription, Root } from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { UseGuards } from '@nestjs/common';
import { ReqUser } from '../../helpers/decorators/user.decorator';
import { User } from '../users/user.interface';
import { FindOneChatDto } from './dto/find-one-chat.dto';
import { Chat } from './chat.interface';
import { FindChatsListDto } from './dto/find-chats-list.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PublisherService } from '../core/services/publisher.service';
import { idEqualsFilter } from '../../helpers/handlers/id-equals.filter';
import { Events } from '../../helpers/enums/events.enum';
import { GqlAuthGuard } from '../../helpers/guards/auth.guard';
import { withFilter } from 'graphql-subscriptions';
import { Message } from '../messages/message.interface';
import { MessageInfo } from '../messages/interfaces/message-info.interface';

@Resolver('Chat')
// @UseGuards(GqlAuthGuard)
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
  messageAdded() {
    return {
      subscribe: withFilter(
        () => this.publisherService.asyncIterator(Events.CHATS_MESSAGE_ADDED),
        (payload: { messageAdded: Message }, { chatId }) =>{
          console.log(payload);
          return payload.messageAdded.chat.toString() === chatId
        })
    }
  }

  @Subscription('messageEdited')
  onMessageEditedToChat() {
    return {
      subscribe: withFilter(
        () => this.publisherService.asyncIterator(Events.CHATS_MESSAGE_EDITED),
        (payload: { messageEdited: Message }, { chatId }) =>{
          return payload.messageEdited.chat.toString() === chatId
        })
    }
  }

  @Subscription('messageRemoved')
  onMessageRemovedFromChat(@Args('chatId') id: string) {
    return {
      subscribe: withFilter(
        () => this.publisherService.asyncIterator(Events.CHATS_MESSAGE_REMOVED),
        (payload: { messageRemoved: MessageInfo }, { chatId }) =>{
          return payload.messageRemoved.chatId.toString() === chatId
        })
    }
  }
}