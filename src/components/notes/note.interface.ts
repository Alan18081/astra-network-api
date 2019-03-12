import { Document } from 'mongoose';
import { File } from '../files/file.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.interface';

export interface Note extends Document {
  title: string;
  description?: string;
  files?: File[];
  comments: Comment[];
  userId?: number;
  groupId?: number;
  user: User | string;
}
