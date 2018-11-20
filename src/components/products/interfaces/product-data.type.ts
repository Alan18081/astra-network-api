import { CreateProductDto } from '../dto/create-product.dto';
import { ProductImages } from './product-images.interface';
import { UpdateProductDto } from '../dto/update-product.dto';

export type CreateProductData = CreateProductDto & ProductImages;

export type UpdateProductData = Partial<UpdateProductDto & ProductImages>;