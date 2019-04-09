import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { PublisherService } from '../core/services/publisher.service';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class UsersResolver {
    private readonly usersService;
    private readonly publisherService;
    constructor(usersService: UsersService, publisherService: PublisherService);
    findOneById(id: string): Promise<User | null>;
    getProfile(user: User): Promise<User>;
    getFriends(userId: string): Promise<User[]>;
    createUser(userDto: CreateUserDto): Promise<User>;
    updateUser(user: User, userDto: UpdateUserDto): Promise<User | null>;
    changePassword(user: User, dto: ChangePasswordDto): Promise<boolean>;
    deleteUser(id: string): Promise<void>;
    removeFriend(user: User, friendId: string): Promise<boolean>;
    checkIsFriend(user: User, friendId: string): Promise<boolean>;
    onUserStatusChanged(id: string): import("graphql-subscriptions").ResolverFn;
}
