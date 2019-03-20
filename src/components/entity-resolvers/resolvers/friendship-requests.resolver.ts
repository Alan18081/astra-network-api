import {Args, Mutation, Query, Resolver, ResolveProperty, Parent, Subscription} from '@nestjs/graphql';
import {FriendshipRequestsService} from '../../friendship-requests/friendship-requests.service';
import {FriendshipRequest} from '../../friendship-requests/friendship-request.interface';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from '../../../helpers/guards/auth.guard';
import {User} from '../../users/user.interface';
import {ReqUser} from '../../../helpers/decorators/user.decorator';
import {FriendshipRequestsType} from '../../friendship-requests/friendship-requests-type.enum';
import {CreateRequestDto} from '../../friendship-requests/dto/create-request.dto';
import {PublisherService} from '../../core/services/publisher.service';
import {Events} from '../../../helpers/enums/events.enum';
import { UsersService } from '../../users/users.service';
import { withFilter } from 'graphql-subscriptions';
import { FriendshipRequestInfo } from '../../friendship-requests/interfaces/friendship-request-info.interface';

@Resolver('FriendshipRequest')
export class FriendshipRequestsResolver {

    constructor(
       private readonly friendshipRequestsService: FriendshipRequestsService,
       private readonly publisherService: PublisherService,
       private readonly usersService: UsersService,
    ) {}

    @ResolveProperty('sender')
    async sender(@Parent() { sender }: FriendshipRequest): Promise<User | null> {
        return this.usersService.findOne(sender);
    }

    @ResolveProperty('receiver')
    async receiver(@Parent() { receiver }: FriendshipRequest): Promise<User | null> {
        return this.usersService.findOne(receiver);
    }

    @Query('incomingFriendshipRequestsList')
    @UseGuards(GqlAuthGuard)
    async findManyIncomingRequests(@ReqUser() user: User): Promise<FriendshipRequest[]> {
        return this.friendshipRequestsService.findMany(user._id, FriendshipRequestsType.INCOMING);
    }

    @Query('outgoingFriendshipRequestsList')
    @UseGuards(GqlAuthGuard)
    async findManyOutgoingRequests(@ReqUser() user: User): Promise<FriendshipRequest[]> {
        return this.friendshipRequestsService.findMany(user._id, FriendshipRequestsType.OUTGOING);
    }

    @Mutation('sendFriendshipRequest')
    @UseGuards(GqlAuthGuard)
    async sendOne(@ReqUser() user: User, @Args('input') dto: CreateRequestDto): Promise<FriendshipRequest> {
        const request = await this.friendshipRequestsService.createOne(user._id, dto);
        await this.publisherService.publish(Events.FRIENDSHIP_REQUESTS_SENT_REQUEST, request);
        return request;
    }

    @Mutation('deleteFriendshipRequest')
    @UseGuards(GqlAuthGuard)
    async deleteOne(@ReqUser() user: User, @Args('id') id: string): Promise<void> {
        return this.friendshipRequestsService.deleteOne(id, user._id);
    }

    @Mutation('acceptFriendshipRequest')
    @UseGuards(GqlAuthGuard)
    async acceptOne(@ReqUser() user: User, @Args('id') id: string): Promise<User> {
        const friend = await this.friendshipRequestsService.acceptOne(id, user._id);
        await this.publisherService.publish(
          Events.FRIENDSHIP_REQUESTS_ACCEPTED_REQUEST,
          { senderId: friend._id, user }
        );
        return friend;
    }

    @Mutation('declineFriendshipRequest')
    @UseGuards(GqlAuthGuard)
    async declineOne(@ReqUser() user: User, @Args('id') id: string): Promise<void> {
        const senderId = await this.friendshipRequestsService.declineOne(id, user._id);
        await this.publisherService.publish(
          Events.FRIENDSHIP_REQUESTS_DECLINED_REQUEST,
          { senderId, user }
        );
    }

    @Subscription('friendshipRequestSent')
    onSentOne() {
        return {
            resolve: payload =>  payload,
            subscribe: withFilter(
              () => this.publisherService.asyncIterator(Events.FRIENDSHIP_REQUESTS_SENT_REQUEST),
              (payload: FriendshipRequestInfo, args, { user }) => {
                  return payload.senderId.toString() === user._id.toString();
              }
            )
        }
    }

    @Subscription('friendshipRequestAccepted')
    onAcceptedOne() {
        return {
            resolve: (payload: FriendshipRequestInfo) => payload.user,
            subscribe: withFilter(
              () => this.publisherService.asyncIterator(Events.FRIENDSHIP_REQUESTS_ACCEPTED_REQUEST),
              (payload: FriendshipRequestInfo, args, { user }) => {
                  console.log(payload.senderId, user._id);
                  console.log(payload.senderId === user._id);
                  return payload.senderId.toString() === user._id.toString();
              }
            )
        }
    }

    @Subscription('friendshipRequestDeclined')
    onDeclinedOne() {
        return {
            resolve: (payload: FriendshipRequestInfo) => payload.user,
            subscribe: withFilter(
              () => this.publisherService.asyncIterator(Events.FRIENDSHIP_REQUESTS_DECLINED_REQUEST),
              (payload: FriendshipRequestInfo, args, { user }) => {
                  return payload.senderId.toString() === user._id.toString();
              }
            )
        }
    }
}