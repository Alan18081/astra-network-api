import { Model } from 'mongoose';
import { User } from './user.interface';
import { BaseRepository } from '../core/base.repository';
import { FindManyUsersListDto } from './dto/find-many-users-list.dto';
export declare class UsersRepository extends BaseRepository<User> {
    constructor(userModel: Model<User>);
    findManyWithFilter({ query, ageTo, ageFrom, gender }: FindManyUsersListDto): Promise<User[]>;
    findManyByIds(ids: string[]): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByIdAndFriendId(id: string, friendId: string): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    findUserFriends(userId: string): Promise<User[]>;
    addFriend(userId: string, friendId: string): Promise<User | null>;
    removeFriend(userId: string, friendId: string): Promise<User | null>;
    findUserWithFriend(userId: string, friendId: string): Promise<User | null>;
}
