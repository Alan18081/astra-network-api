import { UserRole } from './entities/user-role.entity';
import { Product } from '../products/product.entity';
import { BaseEntity } from '../core/base.entity';
import { Chat } from '../chats/chat.entity';
export declare class User extends BaseEntity {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    role: UserRole;
    products: Product[];
    googleId: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    chats: Chat[];
}
