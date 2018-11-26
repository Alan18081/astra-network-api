import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { ProductsService } from '../products/products.service';

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
@ApiUseTags('Orders')
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
  ) {}

  // @Get('')
  // @ApiOperation({ title: 'Get all users' })
  // async findAll(@Query() query: FindUsersListDto) {
  //
  // }

  @Post('')
  @ApiOperation({ title: 'Create new order' })
  async createOne(@Body() body: CreateOrderDto): Promise<Order> {
    return await this.ordersService.createOne(body);
  }

}