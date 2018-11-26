import {Module} from '@nestjs/common';
import {ProductsController} from './products.controller';
import {ProductsService} from './products.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Product} from './product.entity';
import {FilesModule} from '../files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    FilesModule,
  ],
  exports: [ProductsService],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}