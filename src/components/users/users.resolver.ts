import {Resolver, Mutation, Args, Query, Subscription } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReqUser } from '../../helpers/decorators/user.decorator';
import { User } from './user.interface';
import { UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { GqlAuthGuard } from "../../helpers/guards/auth.guard";
import { PublisherService } from '../core/services/publisher.service';
import { Events } from '../../helpers/enums/events.enum';
import { idEqualsFilter } from '../../helpers/handlers/id-equals.filter';
import {ChangePasswordDto} from './dto/change-password.dto';

@Resolver()
export class UsersResolver {

  constructor(
    private readonly usersService: UsersService,
    private readonly publisherService: PublisherService,
  ) {}

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

  @Query('friends')
  @UseGuards(GqlAuthGuard)
  async getFriends(@Args('userId') userId: string): Promise<User[]> {
    return this.usersService.findUserFriends(userId);
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

  @Mutation('deleteUser')
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args('id') id: string): Promise<void> {
    return this.usersService.deleteById(id);
  }

  @Mutation('removeFriend')
  @UseGuards(GqlAuthGuard)
  async removeFriend(@ReqUser() user: User, @Args('friendId') friendId: string): Promise<boolean> {
    await this.usersService.removeFriend(user._id, friendId);
    return true;
  }

  @Mutation('checkIsFriend')
  @UseGuards(GqlAuthGuard)
  async checkIsFriend(@ReqUser() user: User, @Args('friendId') friendId: string): Promise<boolean> {
    return this.usersService.checkIsFriend(user._id, friendId);
  }

  @Subscription('userStatusChanged')
  onUserStatusChanged(@Args('id') id: string) {
    return idEqualsFilter(id,() => this.publisherService.asyncIterator(Events.USER_STATUS_CHANGED));
  }


}