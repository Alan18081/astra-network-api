import { Document } from 'mongoose';

export interface User extends Document{
  firstName: string,
  lastName: string,
  age?: number,
  email: string,
  password?: string,
  googleId?: string,
  emailVerified: boolean,
  phoneVerified: boolean,
  // chats: Chat[],
  online: boolean,
  // notes: Note[],
  friends: User[],
}
