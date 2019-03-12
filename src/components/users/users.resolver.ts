import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReqUser } from '../../helpers/decorators/user.decorator';
import { User } from './user.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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

}