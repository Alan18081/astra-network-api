import { CreateProductDto } from '../dto/create-product.dto';
import { ProductImages } from './product-images.interface';
import { UpdateProductDto } from '../dto/update-product.dto';
export declare type CreateProductData = CreateProductDto & ProductImages;
export declare type UpdateProductData = Partial<UpdateProductDto & ProductImages>;
