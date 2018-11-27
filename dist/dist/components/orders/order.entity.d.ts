import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { BaseEntity } from '../core/base.entity';
export declare class Order extends BaseEntity {
    user: User;
    products: Product[];
    totalPrice: number;
    totalCount: number;
}
