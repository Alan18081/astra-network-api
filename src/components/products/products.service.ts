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
import {UpdateProductDto} from './dto/update-product.dto';
import {FilesService} from '../files/files.service';
import {CreateProductData} from './interfaces/product-data.type';
import {User} from '../users/user.entity';

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

  async createOne(payload: CreateProductData, user: User): Promise<Product> {
    const { mainImageId, ...data } = payload;
    const newProduct = {
      ...new Product(),
      ...data,
      seller: user,
    };

    return await this.productsRepository.save(newProduct);
  }

  async updateOne(id: number, payload: UpdateProductDto): Promise<Product | undefined> {
    await this.productsRepository.update(id, payload);

    return await this.productsRepository.findOne(id, {
      relations: ['mainImage', 'images'],
    });
  }

  async deleteOne(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }

}