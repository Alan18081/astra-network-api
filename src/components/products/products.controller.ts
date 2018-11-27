import {
  Body,
  Controller, Delete, ForbiddenException,
  NotFoundException, Param,
  Post, Put,
  UseGuards,
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {Product} from './product.entity';
import {CreateProductDto} from './dto/create-product.dto';
import {AuthGuard} from '@nestjs/passport';
import {ProductsService} from './products.service';
import {FilesService} from '../files/files.service';
import { CreateProductData, UpdateProductData } from './interfaces/product-data.type';
import {Messages} from '../../helpers/enums/messages.enum';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import {User} from '../users/user.entity';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { CommentsService } from '../comments/comments.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
@ApiUseTags('Products')
@ApiBearerAuth()
export class ProductsController {

  constructor(
    private readonly productsService: ProductsService,
    private readonly commentsService: CommentsService,
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

  @Put(':productId/comments')
  @ApiOperation({ title: 'Create comment for product' })
  async createProductComment(
    @Param('productId') productId: number,
    @Body() payload: CreateCommentDto,
    @ReqUser() user: User,
  ): Promise<Product | undefined> {
    const product = await this.productsService.findOne(productId, {});

    if (!product) {
      throw new NotFoundException(Messages.PRODUCT_NOT_FOUND);
    }

    await this.commentsService.createOne(payload, user);

    return await this.productsService.findOne(productId, { includeComments: true });
  }

  @Delete(':productId/comments/:commentId')
  @ApiOperation({ title: 'Delete comment', description: 'It can be done only by seller of product' })
  async updateProductComment(
    @Param('productId') productId: number,
    @Param('commentId') commentId: number,
    @ReqUser() user: User,
  ): Promise<Product | undefined> {
    const product = await this.productsService.findOne(productId, {});

    if (!product || product.seller.id !== user.id) {
      throw new ForbiddenException(Messages.INVALID_RIGHTS_TO_DELETE_COMMENT);
    }

    await this.commentsService.deleteOne(commentId);

    return await this.productsService.findOne(productId, { includeComments: true });
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<void> {
    await this.productsService.deleteOne(id);
  }
}