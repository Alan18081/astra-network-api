import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { AddMessageDto } from './dto/add-message.dto';
import { Message } from './message.interface';
import { ReqUser } from '../../helpers/decorators/user.decorator';
import { User } from '../users/user.interface';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../helpers/guards/auth.guard';
import { PublisherService } from '../core/services/publisher.service';
import { Events } from '../../helpers/enums/events.enum';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageInfo } from './interfaces/message-info.interface';

@Resolver('Message')
// @UseGuards(GqlAuthGuard)
export class MessagesResolver {

  constructor(
    private readonly messagesService: MessagesService,
    private readonly publisherService: PublisherService,
  ) {}

  @Mutation('sendMessage')
  async sendMessage(@ReqUser() user: User, @Args('input') dto: AddMessageDto): Promise<Message | null> {
    const message = await this.messagesService.createOne(user._id, dto);
    await this.publisherService.publish(Events.CHATS_MESSAGE_ADDED, 'messageAdded', message);
    return message;
  }

  @Mutation('editMessage')
  async editMessage(@ReqUser() user: User, @Args('id') id: string,  @Args('input') dto: UpdateMessageDto): Promise<Message | null> {
    const message = await this.messagesService.updateById(id, dto, user._id);
    await this.publisherService.publish(Events.CHATS_MESSAGE_EDITED, 'messageEdited', message);
    return message;
  }

  @Mutation('deleteMessage')
  async deleteMessage(@ReqUser() user: User, @Args('id') id: string): Promise<MessageInfo> {
    const message = await this.messagesService.deleteById(id, user._id);
    await this.publisherService.publish(Events.CHATS_MESSAGE_REMOVED, 'messageEdited', message);
    return message;
  }


}