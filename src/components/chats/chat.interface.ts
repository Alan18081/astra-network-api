import { Document } from 'mongoose';
import {User} from '../users/user.interface';

export interface Chat extends Document {
    _id: string;
    name: string;
    users: User[] | string[]
}