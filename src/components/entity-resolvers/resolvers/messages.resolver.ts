import {Resolver, Mutation, Args, Query, Subscription} from '@nestjs/graphql';
import { MessagesService } from '../../messages/messages.service';
import { AddMessageDto } from '../../messages/dto/add-message.dto';
import { Message } from '../../messages/message.interface';
import { ReqUser } from '../../../helpers/decorators/user.decorator';
import { User } from '../../users/user.interface';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../helpers/guards/auth.guard';
import { PublisherService } from '../../core/services/publisher.service';
import { Events } from '../../../helpers/enums/events.enum';
import { UpdateMessageDto } from '../../messages/dto/update-message.dto';
import { MessageInfo } from '../../messages/interfaces/message-info.interface';
import {withFilter} from 'graphql-subscriptions';
import { ChatsService } from '../../chats/chats.service';

@Resolver('Message')
@UseGuards(GqlAuthGuard)
export class MessagesResolver {

  constructor(
    private readonly messagesService: MessagesService,
    private readonly publisherService: PublisherService,
    private readonly chatsService: ChatsService
  ) {}

  @Query('messages')
  async messages(
    @Args('chatId') chatId: string,
    @Args('skip') skip: number,
    @Args('limit') limit: number
  ): Promise<Message[]> {
    return this.messagesService.findManyByChatId(chatId, skip, limit);
  }

  @Mutation('sendMessage')
  async sendMessage(@ReqUser() user: User, @Args('input') dto: AddMessageDto): Promise<Message> {
    const message = await this.messagesService.createOne(user._id, dto);
    await this.chatsService.setLastMessage(dto.chatId, message._id);
    await this.publisherService.publish(Events.CHATS_MESSAGE_ADDED, message);
    return message;
  }

  @Mutation('editMessage')
  async editMessage(@ReqUser() user: User, @Args('id') id: string,  @Args('input') dto: UpdateMessageDto): Promise<Message | null> {
    const message = await this.messagesService.updateById(id, dto, user._id);
    await this.publisherService.publish(Events.CHATS_MESSAGE_EDITED, message);
    return message;
  }

  @Mutation('deleteMessage')
  async deleteMessage(@ReqUser() user: User, @Args('id') id: string): Promise<MessageInfo> {
    const message = await this.messagesService.deleteById(id, user._id);
    await this.publisherService.publish(Events.CHATS_MESSAGE_REMOVED, message);
    return message;
  }


  @Subscription('messageAdded')
  messageAdded() {
    return {
      resolve(payload) {
        return payload;
      },
      subscribe: withFilter(
        () => this.publisherService.asyncIterator(Events.CHATS_MESSAGE_ADDED),
        (payload: Message, { chatId }, { user }) => {
          return this.chatsService.filterMessages(payload, chatId, user._id);
        }
      )
    }
  }

  @Subscription('messageEdited')
  onMessageEditedToChat() {
    return {
      resolve(payload) {
        return payload;
      },
      subscribe: withFilter(
        () => this.publisherService.asyncIterator(Events.CHATS_MESSAGE_EDITED),
        (payload: Message, { chatId }) =>{
          return payload.chat.toString() === chatId
        })
    }
  }

  @Subscription('messageRemoved')
  onMessageRemovedFromChat(@Args('chatId') id: string) {
    return {
      resolve(payload) {
        return payload;
      },
      subscribe: withFilter(
        () => this.publisherService.asyncIterator(Events.CHATS_MESSAGE_REMOVED),
        (payload: Message, { chatId }) =>{
          return payload.chat.toString() === chatId
        })
    }
  }
}