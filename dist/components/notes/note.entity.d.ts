import { File } from '../files/file.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.entity';
import { BaseEntity } from '../core/base.entity';
export declare class Note extends BaseEntity {
    title: string;
    description?: string;
    files: File[];
    comments: Comment[];
    userId?: number;
    groupId?: number;
    user: User;
}
