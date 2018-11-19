import {Injectable} from '@nestjs/common';
import {BaseService} from '../../helpers/interfaces/base-service.interface';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from './product.entity';
import {Repository} from 'typeorm';
import {CreateProductDto} from './dto/create-product.dto';

@Injectable()
export class ProductsService implements BaseService {

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  create(payload): {

  };

}