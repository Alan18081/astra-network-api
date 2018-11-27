import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './services/users.service';
import { FindUsersListDto } from './dto/find-users-list.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { PaginatedResult } from './interfaces/paginated-result.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findMany(query: FindUsersListDto): Promise<User[] | PaginatedResult<User>>;
    findOne(id: number): Promise<User | undefined>;
    create(payload: CreateUserDto): Promise<User | undefined>;
    updateProfile(payload: UpdateUserDto, user: User): Promise<User | undefined>;
    deleteUser(id: number): Promise<void>;
}
