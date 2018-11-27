import { User } from '../users/user.entity';
import { File } from '../files/file.entity';
import { Order } from '../orders/order.entity';
import { BaseEntity } from '../core/base.entity';
export declare class Product extends BaseEntity {
    title: string;
    description: string;
    seller: User;
    mainImage: File;
    images: File[];
    quantity: number;
    price: number;
    orders: Order[];
}
