import {
  Body,
  Controller, Delete,
  NotFoundException, Param,
  Post, Put,
  UseGuards,
} from '@nestjs/common';
import {File} from '../files/file.entity';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {Product} from './product.entity';
import {CreateProductDto} from './dto/create-product.dto';
import {AuthGuard} from '@nestjs/passport';
import {ProductsService} from './products.service';
import {FilesService} from '../files/files.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductData, UpdateProductData } from './interfaces/product-data.type';
import {Messages} from '../../helpers/enums/messages.enum';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import {User} from '../users/entities/user.entity';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
@ApiUseTags('Products')
export class ProductsController {

  constructor(
    private readonly productsService: ProductsService,
    private readonly filesService: FilesService,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create new product' })
  async createOne(@Body() payload: CreateProductDto, @ReqUser() user: User): Promise<Product> {
    const mainImage = await this.filesService.findOne(payload.mainImageId);

    if (!mainImage) {
      throw new NotFoundException(Messages.FILE_NOT_FOUND);
    }

    const productData: CreateProductData = { ...payload, mainImage };
    return await this.productsService.createOne(productData, user);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update existing product by id' })
  async updateOne(@Param('id') id: number, @Body() payload: UpdateProductDto): Promise<Product | undefined> {
    return await this.productsService.updateOne(id, payload);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<void> {
    await this.productsService.deleteOne(id);
  }
}