import {
  Body,
  Controller, Delete,
  FileFieldsInterceptor, Param,
  Post, Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {File} from '../files/file.entity';
import {ApiUseTags} from '@nestjs/swagger';
import {Product} from './product.entity';
import {CreateProductDto} from './dto/create-product.dto';
import {AuthGuard} from '@nestjs/passport';
import {ProductsService} from './products.service';
import {FilesService} from '../files/files.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductData, UpdateProductData } from './interfaces/product-data.type';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
@ApiUseTags('Products')
export class ProductsController {

  constructor(
    private readonly productsService: ProductsService,
    private readonly filesService: FilesService,
  ) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images' },
  ]))
  async create(@UploadedFiles() files: any, @Body() payload: CreateProductDto): Promise<Product> {
    const mainImage = await this.filesService.uploadFile(files.mainImage[0]);
    const productsData: CreateProductData = {...payload, mainImage};

    if (files.images) {
      productsData.images = await Promise.all<File>(files.images.map(file => this.filesService.uploadFile(file)));
    }

    return await this.productsService.createOne(productsData);
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images' },
  ]))
  async update(@Param('id') id: number, @UploadedFiles() files: any, @Body() payload: UpdateProductDto): Promise<Product | undefined> {
    const productData: UpdateProductData = {...payload};

    if (files.mainImage) {
      productData.mainImage = await this.filesService.uploadFile(files.mainImage);
    }

    if (files.images) {
      productData.images = await Promise.all<File>(files.images.map(file => this.filesService.uploadFile(file)));
    }

    return await this.productsService.updateOne(id, productData);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<void> {
    await this.productsService.deleteOne(id);
  }
}