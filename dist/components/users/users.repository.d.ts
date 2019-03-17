import { Model } from 'mongoose';
import { User } from './user.interface';
import { BaseRepository } from '../core/base.repository';
export declare class UsersRepository extends BaseRepository<User> {
    constructor(userModel: Model<User>);
    findManyByIds(ids: string[]): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    findOneByGoogleId(googleId: string): Promise<User | null>;
    findUserFriends(userId: string): Promise<User[]>;
    addFriend(userId: string, friendId: string): Promise<User | null>;
    removeFriend(userId: string, friendId: string): Promise<User | null>;
    findUserWithFriend(userId: string, friendId: string): Promise<User | null>;
}
