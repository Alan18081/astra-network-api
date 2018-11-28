import { Module } from '@nestjs/common';
import { UsersModule } from './components/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ORM_CONFIG} from './config';
import {AuthModule} from './components/auth/auth.module';
// import {ProductsModule} from './components/products/products.module';
import { FilesModule } from './components/files/files.module';
import { OrdersModule } from './components/orders/orders.module';
import {MessagesModule} from './components/messages/messages.module';
import { ChatsModule } from './components/chats/chats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ORM_CONFIG),
    UsersModule,
    AuthModule,
    //ProductsModule,
    FilesModule,
    OrdersModule,
    MessagesModule,
    ChatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
