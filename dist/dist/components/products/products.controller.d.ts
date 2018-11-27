import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { FilesService } from '../files/files.service';
import { User } from '../users/user.entity';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { CommentsService } from '../comments/comments.service';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    private readonly commentsService;
    private readonly filesService;
    constructor(productsService: ProductsService, commentsService: CommentsService, filesService: FilesService);
    createOne(payload: CreateProductDto, user: User): Promise<Product>;
    updateOne(id: number, payload: UpdateProductDto): Promise<Product | undefined>;
    createProductComment(productId: number, payload: CreateCommentDto, user: User): Promise<Product | undefined>;
    updateProductComment(productId: number, commentId: number, user: User): Promise<Product | undefined>;
    deleteOne(id: number): Promise<void>;
}
