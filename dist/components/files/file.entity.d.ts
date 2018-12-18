import { BaseEntity } from '../core/base.entity';
import { User } from '../users/user.entity';
export declare class File extends BaseEntity {
    url: string;
    publicId: string;
    userId: number;
    user: User;
}
