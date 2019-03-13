import {Module} from '@nestjs/common';
import {CoreModule} from '../core/core.module';
import {UsersService} from './users.service';
import {MongooseModule} from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UsersRepository } from './users.repository';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  exports: [UsersService],
  providers: [UsersService, UsersRepository, UsersResolver],
})
export class UsersModule {}