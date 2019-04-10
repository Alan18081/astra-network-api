import {Resolver, Query, Mutation, Args, Subscription, ResolveProperty, Parent} from '@nestjs/graphql';
import { ChatsService } from '../../chats/chats.service';
import { UseGuards } from '@nestjs/common';
import { ReqUser } from '../../../helpers/decorators/user.decorator';
import { User } from '../../users/user.interface';
import { Chat } from '../../chats/chat.interface';
import { FindChatsListDto } from '../../chats/dto/find-chats-list.dto';
import { CreateChatDto } from '../../chats/dto/create-chat.dto';
import { UpdateChatDto } from '../../chats/dto/update-chat.dto';
import { PublisherService } from '../../core/services/publisher.service';
import { idEqualsFilter } from '../../../helpers/handlers/id-equals.filter';
import { Events } from '../../../helpers/enums/events.enum';
import { GqlAuthGuard } from '../../../helpers/guards/auth.guard';
import {AddUserToChatDto} from '../../chats/dto/add-user-to-chat.dto';
import {RemoveUserFromChatDto} from '../../chats/dto/remove-user-from-chat.dto';
import {UsersService} from '../../users/users.service';
import { MessagesService } from '../../messages/messages.service';
import { Message } from '../../messages/message.interface';
import { withFilter } from 'graphql-subscriptions';
import { ChatUserInfoInterface } from '../../chats/interfaces/chat-user-info.interface';

@Resolver('Chat')
export class ChatsResolver {

  constructor(
    private readonly chatsService: ChatsService,
    private readonly publisherService: PublisherService,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService
  ) {}

  @ResolveProperty('messages')
  async messages(
      @Parent() chat: Chat,
      @Args('skip') skip: number,
      @Args('limit') limit: number
  ): Promise<Message[]> {
      return this.messagesService.findManyByChatId(chat._id, skip, limit);
  }

  @ResolveProperty('lastMessage')
  async lastMessage(@Parent() chat: Chat): Promise<Message | null> {
    if(chat.lastMessage) {
      return this.messagesService.findById(chat.lastMessage);
    }
    console.log('Hello');
    return null;
  }

  @ResolveProperty('admin')
  async admin(@Parent() chat: Chat): Promise<User | null> {
    return this.usersService.findOne(chat.admin);
  }

  @ResolveProperty('users')
  async users(@Parent() chat: Chat): Promise<User[]> {
    return this.usersService.findManyByIds(chat.users);
  }

  @Query('chatsList')
  @UseGuards(GqlAuthGuard)
  async findManyChatsByUser(@Args('input') dto: FindChatsListDto): Promise<Chat[]> {
    return this.chatsService.findMany(dto);
  }

  @Query('chat')
  @UseGuards(GqlAuthGuard)
  async findChatById(@ReqUser() user: User, @Args('id') id: string): Promise<Chat | null> {
    return this.chatsService.findOneByIdAndUserId(id, user._id);
  }






  @Mutation('createChat')
  @UseGuards(GqlAuthGuard)
  async createChat(@ReqUser() user: User, @Args('input') chatDto: CreateChatDto): Promise<Chat> {
    return this.chatsService.createOne(user._id, chatDto);
  }

  @Mutation('updateChat')
  @UseGuards(GqlAuthGuard)
  async updateChat(@Args('id') id: string, @Args('input') chatDto: UpdateChatDto): Promise<Chat | null> {
    return this.chatsService.updateById(id, chatDto);
  }

  @Mutation('deleteChat')
  @UseGuards(GqlAuthGuard)
  async deleteChat(@Args('id') id: string): Promise<boolean> {
    await this.chatsService.deleteById(id);
    return true;
  }

  @Mutation('addUserToChat')
  @UseGuards(GqlAuthGuard)
  async addUserToChat(@ReqUser() reqUser: User, @Args('input') dto: AddUserToChatDto): Promise<Chat | null> {
    const { chat, user } = await this.chatsService.addUserToChat(reqUser._id, dto);
    await this.publisherService.publish(Events.CHATS_USER_ADDED, { chatId: dto.chatId, user });
    return chat;
  }

  @Mutation('removeUserFromChat')
  @UseGuards(GqlAuthGuard)
  async removeUserFromChat(@ReqUser() reqUser: User, @Args('input') dto: RemoveUserFromChatDto): Promise<Chat | null> {
      const { chat, user } = await this.chatsService.removeUserFromChat(reqUser._id, dto);
      await this.publisherService.publish(Events.CHATS_USER_REMOVED, { chatId: dto.chatId, user });
      return chat;
  }

  @Mutation('attendChat')
  @UseGuards(GqlAuthGuard)
  async attendChat(@ReqUser() reqUser: User, @Args('chatId') chatId: string): Promise<Chat | null> {
    const { chat, user } = await this.chatsService.addUserToChat(chatId, reqUser._id);
    await this.publisherService.publish(Events.CHATS_USER_ADDED, { chatId, user });
    return chat;
  }

  @Mutation('leaveChat')
  @UseGuards(GqlAuthGuard)
  async leaveChat(@ReqUser() user: User, @Args('chatId') chatId: string): Promise<boolean> {
    await this.chatsService.leaveChat(chatId, user._id);
    await this.publisherService.publish(Events.CHATS_USER_REMOVED, { chatId, user: user });
    return true;
  }

  @Subscription('userAddedToChat')
  onUserAddedToChat() {
    return {
      resolve: (payload: ChatUserInfoInterface) => payload.user,
      subscribe: withFilter(
        () => this.publisherService.asyncIterator(Events.CHATS_USER_ADDED),
        (payload: ChatUserInfoInterface, { chatId }) => {
          return payload.chatId === chatId;
        })
    };
  }

  @Subscription('userRemovedFromChat')
  onUserRemovedFromChat() {
    return {
      resolve: (payload: ChatUserInfoInterface) => payload.user,
      subscribe: withFilter(
        () => this.publisherService.asyncIterator(Events.CHATS_USER_REMOVED),
        (payload: ChatUserInfoInterface, { chatId }) => {
          return payload.chatId === chatId;
        })
    };
  }

}