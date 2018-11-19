import {Body, Controller, FileInterceptor, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {Product} from './product.entity';
import {CreateProductDto} from './dto/create-product.dto';
import {AuthGuard} from '@nestjs/passport';
import {ProductsService} from './products.service';
import {FilesService} from '../files/files.service';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
@ApiUseTags('Products')
export class ProductsController {

  constructor(
    private readonly productsService: ProductsService,
    private readonly filesService: FilesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: File, @Body() payload: CreateProductDto): Promise<Product> {
    const mainImage = await this.filesService.uploadFile(file);
    return await this.productsService.create({ ...payload, mainImage });
  }

}