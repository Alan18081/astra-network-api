import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReqUser } from '../../helpers/decorators/user.decorator';
import { User } from './user.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver()
export class UsersResolver {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Query('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@ReqUser() user: User): Promise<User> {
    return user;
  }

  @Query('friends')
  @UseGuards(AuthGuard('jwt'))
  async getFriends(@Args('userId') userId: string): Promise<User[]> {
    return this.usersService.findUserFriends(userId);
  }

  @Mutation('createUser')
  async createUser(@Args('input') userDto: CreateUserDto): Promise<User> {
    return this.usersService.createOne(userDto);
  }

  @Mutation('updateUser')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Args('id') id: string, @Args('input') userDto: UpdateUserDto): Promise<User | null> {
    return this.usersService.updateById(id, userDto);
  }

  @Mutation('deleteUser')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Args('id') id: string): Promise<void> {
    return this.usersService.deleteById(id);
  }

  @Mutation('addFriend')
  @UseGuards(AuthGuard('jwt'))
  async addFriend(@ReqUser() user: User, @Args('friendId') friendId: string): Promise<boolean> {
    await this.usersService.addFriend(user._id, friendId);
    return true;
  }

  @Mutation('removeFriend')
  @UseGuards(AuthGuard('jwt'))
  async removeFriend(@ReqUser() user: User, @Args('friendId') friendId: string): Promise<boolean> {
    await this.usersService.removeFriend(user._id, friendId);
    return true;
  }

  @Mutation('checkIsFriend')
  @UseGuards(AuthGuard('jwt'))
  async checkIsFriend(@ReqUser() user: User, @Args('friendId') friendId: string): Promise<boolean> {
    return this.usersService.checkIsFriend(user._id, friendId);
  }


}