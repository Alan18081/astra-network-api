import { Document } from 'mongoose';

export interface User extends Document{
  firstName: string,
  lastName: string,
  age?: number,
  email: string,
  password: string,
  googleId?: string,
  emailVerified: boolean,
  phoneVerified: boolean,
  chats: string[],
  online: boolean,
  notes: string[];
  friends: User[],
}
