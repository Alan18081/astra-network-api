import { User } from '../components/users/user.interface';

export const isUser = (obj: User | string): obj is User => {
  return !!(obj && typeof obj !== 'string');
}