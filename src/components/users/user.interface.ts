import { Document } from 'mongoose';

export interface User extends Document{
  firstName: string;
  lastName: string;
  age?: number;
  email: string;
  countryCode?: string;
  authyId?: string;
  phone?: string;
  password: string;
  phoneVerified: boolean;
  chats: string[];
  online: boolean;
  notes: string[];
  friends: User[];
}
