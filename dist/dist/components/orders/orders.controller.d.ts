import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { ProductsService } from '../products/products.service';
export declare class OrdersController {
    private readonly ordersService;
    private readonly productsService;
    constructor(ordersService: OrdersService, productsService: ProductsService);
    createOne(body: CreateOrderDto): Promise<void>;
}
