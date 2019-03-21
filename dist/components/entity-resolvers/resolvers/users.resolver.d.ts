import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.interface';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { PublisherService } from '../../core/services/publisher.service';
import { ChangePasswordDto } from '../../users/dto/change-password.dto';
import { FindManyUsersListDto } from '../../users/dto/find-many-users-list.dto';
export declare class UsersResolver {
    private readonly usersService;
    private readonly publisherService;
    constructor(usersService: UsersService, publisherService: PublisherService);
    friends(user: User): Promise<User[]>;
    findMany(dto: FindManyUsersListDto): Promise<User[]>;
    findOneById(id: string): Promise<User | null>;
    getProfile(user: User): Promise<User>;
    createUser(userDto: CreateUserDto): Promise<User>;
    updateUser(user: User, userDto: UpdateUserDto): Promise<User | null>;
    changePassword(user: User, dto: ChangePasswordDto): Promise<boolean>;
    deleteFriend(user: User, friendId: string): Promise<boolean>;
    checkIsFriend(user: User, friendId: string): Promise<boolean>;
    onUserStatusChanged(id: string): import("graphql-subscriptions").ResolverFn;
}
