import { Document } from 'mongoose';
import {User} from '../users/user.interface';

export interface Comment extends Document {
    _id: string;
    text: string;
    createdAt: Date;
    user: User | string;
}