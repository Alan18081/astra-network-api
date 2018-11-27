import { Product } from '../products/product.entity';
import { BaseEntity } from '../core/base.entity';
export declare class File extends BaseEntity {
    url: string;
    publicId: string;
    product: Product;
}
