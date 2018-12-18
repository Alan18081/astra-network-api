import { User } from '../users/user.entity';
export declare class RefreshToken {
    id: number;
    token: string;
    userId: number;
    user: User;
}
