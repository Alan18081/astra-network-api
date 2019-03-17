import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {FriendshipRequestsService} from './friendship-requests.service';
import {FriendshipRequest} from './friendship-request.interface';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from '../../helpers/guards/auth.guard';
import {User} from '../users/user.interface';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import {FriendshipRequestsType} from './friendship-requests-type.enum';
import {CreateRequestDto} from './dto/create-request.dto';
import {PublisherService} from '../core/services/publisher.service';
import {Events} from '../../helpers/enums/events.enum';

@Resolver()
@UseGuards(GqlAuthGuard)
export class FriendshipRequestsResolver {

    constructor(
       private readonly friendshipRequestsService: FriendshipRequestsService,
       private readonly publisherService: PublisherService
    ) {}

    @Query('findManyIncomingFriendshipRequests')
    async findManyIncomingRequests(@ReqUser() user: User): Promise<FriendshipRequest[]> {
        return this.friendshipRequestsService.findMany(user._id, FriendshipRequestsType.INCOMING);
    }

    @Query('findManyOutgoingFriendshipRequests')
    async findManyOutgoingRequests(@ReqUser() user: User): Promise<FriendshipRequest[]> {
        return this.friendshipRequestsService.findMany(user._id, FriendshipRequestsType.OUTGOING);
    }

    @Mutation('createFriendshipRequest')
    async createOne(@ReqUser() user: User, @Args('input') dto: CreateRequestDto): Promise<FriendshipRequest> {
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


}