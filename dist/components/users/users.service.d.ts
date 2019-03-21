import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from '../core/services/hash.service';
import { UsersRepository } from './users.repository';
import { User } from './user.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FindManyUsersListDto } from './dto/find-many-users-list.dto';
export declare class UsersService {
    private readonly usersRepository;
    private readonly hashService;
    constructor(usersRepository: UsersRepository, hashService: HashService);
    findMany(payload: FindManyUsersListDto): Promise<User[]>;
    findManyByIds(ids: string[]): Promise<User[]>;
    findUserFriends(userId: string): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByIdAndFriendId(id: string, friendId: string): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    createOne(payload: CreateUserDto): Promise<User>;
    updateById(id: string, payload: Partial<User>): Promise<User | null>;
    changePassword(user: User, { oldPassword, newPassword }: ChangePasswordDto): Promise<User | null>;
    deleteById(id: string): Promise<void>;
    setNewPassword(id: string, password: string): Promise<void>;
    addFriend(userId: string, friendId: string): Promise<User | null>;
    removeFriend(userId: string, friendId: string): Promise<User | null>;
    checkIsFriend(userId: string, friendId: string): Promise<boolean>;
    setAuthyId(id: string, authyId: string): Promise<User | null>;
    setPhoneVerified(id: string): Promise<User | null>;
}
