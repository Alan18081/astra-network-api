import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './components/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ORM_CONFIG} from './config/orm-config';
import {AuthModule} from './components/auth/auth.module';
import {ProductsModule} from './components/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ORM_CONFIG),
    UsersModule,
    AuthModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
