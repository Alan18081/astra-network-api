import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './components/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ORM_CONFIG} from './config/orm-config';
import {AuthModule} from './components/auth/auth.module';
import {ProductsModule} from './components/products/products.module';
import { FilesModule } from './components/files/files.module';
import { OrdersModule } from './components/orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ORM_CONFIG),
    UsersModule,
    AuthModule,
    ProductsModule,
    FilesModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
