import {Resolver, Mutation, Args, Query, Subscription, Parent, ResolveProperty } from '@nestjs/graphql';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/users.service';
import { ReqUser } from '../../../helpers/decorators/user.decorator';
import { User } from '../../users/user.interface';
import { UseGuards } from '@nestjs/common';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { GqlAuthGuard } from "../../../helpers/guards/auth.guard";
import { PublisherService } from '../../core/services/publisher.service';
import { Events } from '../../../helpers/enums/events.enum';
import { idEqualsFilter } from '../../../helpers/handlers/id-equals.filter';
import {ChangePasswordDto} from '../../users/dto/change-password.dto';
import { FindManyUsersListDto } from '../../users/dto/find-many-users-list.dto';
import {withFilter} from "graphql-subscriptions";
import {ChatUserInfoInterface} from "../../chats/interfaces/chat-user-info.interface";

@Resolver('User')
export class UsersResolver {

  constructor(
    private readonly usersService: UsersService,
    private readonly publisherService: PublisherService,
  ) {}

  @ResolveProperty('friends')
  async friends(@Parent() user: User): Promise<User[]> {
    return this.usersService.findUserFriends(user._id);
  }

  @Query('usersList')
  @UseGuards(GqlAuthGuard)
  async findMany(@Args('input') dto: FindManyUsersListDto): Promise<User[]> {
    return this.usersService.findMany(dto);
  }

  @Query('user')
  @UseGuards(GqlAuthGuard)
  async findOneById(@Args('id') id: string): Promise<User | null> {
      return this.usersService.findOne(id);
  }

  @Query('profile')
  @UseGuards(GqlAuthGuard)
  async getProfile(@ReqUser() user: User): Promise<User> {
    return user;
  }

  @Mutation('createUser')
  async createUser(@Args('input') userDto: CreateUserDto): Promise<User> {
    return this.usersService.createOne(userDto);
  }

  @Mutation('updateProfile')
  @UseGuards(GqlAuthGuard)
  async updateUser(@ReqUser() user: User, @Args('input') userDto: UpdateUserDto): Promise<User | null> {
    return this.usersService.updateById(user._id, userDto);
  }

  @Mutation('changePassword')
  @UseGuards(GqlAuthGuard)
  async changePassword(@ReqUser() user: User, @Args('input') dto: ChangePasswordDto): Promise<boolean> {
    await this.usersService.changePassword(user, dto);
    return true;
  }

  @Mutation('deleteFriend')
  @UseGuards(GqlAuthGuard)
  async deleteFriend(@ReqUser() user: User, @Args('friendId') friendId: string): Promise<boolean> {
    await Promise.all([
      this.usersService.removeFriend(user._id, friendId),
      this.usersService.removeFriend(friendId, user._id)
    ]);
    return true;
  }

  @Mutation('checkIsFriend')
  @UseGuards(GqlAuthGuard)
  async checkIsFriend(@ReqUser() user: User, @Args('friendId') friendId: string): Promise<boolean> {
    return this.usersService.checkIsFriend(user._id, friendId);
  }

  @Subscription('userStatusChanged')
  onUserStatusChanged() {
    return {
      subscribe: withFilter(
          () => this.publisherService.asyncIterator(Events.USER_STATUS_CHANGED),
          (payload: User, { id }) => payload._id === id
      )
    };
  }


}