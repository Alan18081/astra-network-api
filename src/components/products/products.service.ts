import {Injectable} from '@nestjs/common';
import {BaseService} from '../../helpers/interfaces/base-service.interface';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from './product.entity';
import {Repository} from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductImages } from './interfaces/product-images.interface';
import { FindProductDto } from './dto/find-product.dto';
import { FindProductsListDto } from './dto/find-products-list.dto';
import { File } from '../files/file.entity';

@Injectable()
export class ProductsService implements BaseService<Product> {

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findMany(query: FindProductsListDto): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number, query: FindProductDto): Promise<Product | undefined> {
    return this.productsRepository.findOne(id);
  }

  async createOne(payload: CreateProductDto): Promise<Product> {
    const newProduct = {
      ...new Product(),
      ...payload,
      mainImage: { id: payload.mainImage } as File,
    };

    return await this.productsRepository.save(newProduct);
  }

  async updateOne(id: number, payload: Partial<CreateProductDto & ProductImages>): Promise<Product | undefined> {
    await this.productsRepository.update(id, payload);

    return await this.productsRepository.findOne(id, {
      relations: ['mainImage', 'images'],
    });
  }

  async deleteOne(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }

}