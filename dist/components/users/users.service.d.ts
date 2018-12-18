import { BaseService } from '../../helpers/interfaces/base-service.interface';
import { User } from './user.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from '../core/services/hash.service';
import { FindUsersListDto } from './dto/find-users-list.dto';
import { GoogleUserData } from './interfaces/google-user-data.interface';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';
import { PaginationDto } from '../core/dto/pagination.dto';
export declare class UsersService implements BaseService<User> {
    private readonly usersRepository;
    private readonly hashService;
    constructor(usersRepository: Repository<User>, hashService: HashService);
    findMany(payload: FindUsersListDto): Promise<User[]>;
    prepareBuilder(queryBuilder: SelectQueryBuilder<User>, query: FindUsersListDto): SelectQueryBuilder<User>;
    findManyWithPagination(query: FindUsersListDto & Required<PaginationDto>): Promise<PaginatedResult<User>>;
    findOne(id: number): Promise<User | undefined>;
    findOneByEmail(email: string): Promise<User | undefined>;
    findOneByGoogleId(id: string): Promise<User | undefined>;
    createOne(payload: CreateUserDto): Promise<User>;
    createByGoogle(payload: GoogleUserData): Promise<User>;
    updateOne(id: number, payload: Partial<User>): Promise<User | undefined>;
    deleteOne(id: number): Promise<void>;
    setNewPassword(id: number, password: string): Promise<void>;
    addFriend(userId: number, friendId: number): Promise<User | undefined>;
    removeFriend(userId: number, friendId: number): Promise<User | undefined>;
    isFriend(userId: number, friendId: number): Promise<boolean>;
}
