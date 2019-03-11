import { Resolver } from "@nestjs/graphql";
import { UsersService } from './users.service';
import { Query } from '@nestjs/common';

@Resolver('User')
export class UsersResolver {

  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  async getUsersList() {
    return this.usersService.findMany({});
  }

}