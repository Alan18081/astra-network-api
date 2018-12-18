import { User } from '../../users/user.entity';
export interface Socket {
    id: string;
    socket: any;
    user: User;
}
