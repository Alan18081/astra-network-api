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
  async findChatById(@Args('id') id: string): Promise<Chat | null> {
    return this.chatsService.findOne(id);
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
  async addUserToChat(@ReqUser() user: User, @Args('input') dto: AddUserToChatDto): Promise<Chat | null> {
    return this.chatsService.addUserToChat(user._id, dto);
  }

  @Mutation('removeUserFromChat')
  @UseGuards(GqlAuthGuard)
  async removeUserFromChat(@ReqUser() user: User, @Args('input') dto: RemoveUserFromChatDto): Promise<Chat | null> {
      return this.chatsService.removeUserFromChat(user._id, dto);
  }

  @Mutation('attendChat')
  @UseGuards(GqlAuthGuard)
  async attendChat(@ReqUser() user: User, @Args('chatId') chatId: string): Promise<Chat | null> {
    return this.chatsService.addUserToChat(chatId, user._id);
  }

  @Mutation('leaveChat')
  @UseGuards(GqlAuthGuard)
  async leaveChat(@ReqUser() user: User, @Args('chatId') chatId: string): Promise<boolean> {
      await this.chatsService.leaveChat(chatId, user._id);
      await this.publisherService.publish(Events.CHATS_USER_REMOVED, { chatId, userId: user._id });
      return true;
  }

  @Subscription('userAddedToChat')
  onUserAddedToChat(@Args('id') id: string) {
    return idEqualsFilter(id,() => this.publisherService.asyncIterator(Events.CHATS_USER_ADDED));
  }

  @Subscription('userRemovedFromChat')
  onUserRemovedFromChat(@Args('id') id: string) {
    return idEqualsFilter(id, () => this.publisherService.asyncIterator(Events.CHATS_USER_REMOVED));
  }

}