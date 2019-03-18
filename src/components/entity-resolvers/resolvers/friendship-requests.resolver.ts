import {Args, Mutation, Query, Resolver, ResolveProperty, Parent} from '@nestjs/graphql';
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

@Resolver('FriendshipRequest')
@UseGuards(GqlAuthGuard)
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
    async findManyIncomingRequests(@ReqUser() user: User): Promise<FriendshipRequest[]> {
        return this.friendshipRequestsService.findMany(user._id, FriendshipRequestsType.INCOMING);
    }

    @Query('outgoingFriendshipRequestsList')
    async findManyOutgoingRequests(@ReqUser() user: User): Promise<FriendshipRequest[]> {
        return this.friendshipRequestsService.findMany(user._id, FriendshipRequestsType.OUTGOING);
    }

    @Mutation('sendFriendshipRequest')
    async sendOne(@ReqUser() user: User, @Args('input') dto: CreateRequestDto): Promise<FriendshipRequest> {
        return this.friendshipRequestsService.createOne(user._id, dto);
    }

    @Mutation('deleteFriendshipRequest')
    async deleteOne(@ReqUser() user: User, @Args('id') id: string): Promise<void> {
        return this.friendshipRequestsService.deleteOne(id, user._id);
    }

    @Mutation('acceptFriendshipRequest')
    async acceptOne(@ReqUser() user: User, @Args('id') id: string): Promise<boolean> {
        const friend = await this.friendshipRequestsService.acceptOne(id, user._id);
        await this.publisherService.publish(Events.FRIENDSHIP_REQUESTS_ACCEPTED_REQUEST, friend);
        return true;
    }

    // @Subscription()

}