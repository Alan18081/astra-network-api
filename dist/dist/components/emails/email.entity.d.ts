import { User } from '../users/user.entity';
import { BaseEntity } from '../core/base.entity';
export declare class Email extends BaseEntity {
    title: string;
    template: string;
    sender: User;
    receivers: User[];
}
