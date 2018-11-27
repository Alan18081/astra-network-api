import { BaseService } from '../../helpers/interfaces/base-service.interface';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { FindProductDto } from './dto/find-product.dto';
import { FindProductsListDto } from './dto/find-products-list.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductData } from './interfaces/product-data.type';
import { User } from '../users/user.entity';
export declare class ProductsService implements BaseService<Product> {
    private readonly productsRepository;
    constructor(productsRepository: Repository<Product>);
    findMany(query: FindProductsListDto): Promise<Product[]>;
    findOne(id: number, query: FindProductDto): Promise<Product | undefined>;
    createOne(payload: CreateProductData, user: User): Promise<Product>;
    updateOne(id: number, payload: UpdateProductDto): Promise<Product | undefined>;
    deleteOne(id: number): Promise<void>;
}
