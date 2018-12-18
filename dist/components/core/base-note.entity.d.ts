import { BaseEntity } from './base.entity';
import { File } from '../files/file.entity';
import { Comment } from '../comments/comment.entity';
export declare class BaseNote extends BaseEntity {
    title: string;
    description?: string;
    files: File[];
    comments: Comment[];
}
