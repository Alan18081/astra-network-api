import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {CreateUserDto} from './dto/create-user.dto';
import {UsersService} from './users.service';
import {Messages} from '../../helpers/enums/messages.enum';
import {AuthGuard} from '@nestjs/passport';
import {FindUsersListDto} from './dto/find-users-list.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import {User} from './user.entity';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';
import { PaginationDto } from '../core/dto/pagination.dto';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Fetch list of users' })
  async findMany(@Query() query: FindUsersListDto): Promise<User[] | PaginatedResult<User>> {
    if (query.page && query.limit) {
      return await this.usersService.findManyWithPagination(query as FindUsersListDto & Required<PaginationDto>);
    }

    return await this.usersService.findMany(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get particular user by id' })
  async findOne(@Param('id') id: number): Promise<User | undefined> {
    return await this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ title: 'Creating new user' })
  async createOne(@Body() payload: CreateUserDto): Promise<User | undefined> {
    const user = await this.usersService.findOneByEmail(payload.email);

    if (user) {
      throw new BadRequestException(Messages.USER_ALREADY_EXISTS);
    }

    return await this.usersService.createOne(payload);
  }

  @Put('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: 'Update your profile' })
  async updateProfile(@Body() payload: UpdateUserDto, @ReqUser() user: User) {
    return await this.usersService.updateOne(user.id, payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: 'Delete user by id' })
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.usersService.deleteOne(id);
  }
}