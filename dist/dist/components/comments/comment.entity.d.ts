import { User } from '../users/user.entity';
import { BaseEntity } from '../core/base.entity';
export declare class Comment extends BaseEntity {
    text: string;
    author: User;
}
