import { Document } from 'mongoose';
import { User } from '../users/user.interface';
import { Comment } from '../comments/comment.interface';
import { File } from '../files/file.interface';

export interface Note extends Document {
  title: string;
  description?: string;
  files?: File[];
  comments: Comment[];
  user: User | string;
}
