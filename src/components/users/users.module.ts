import {Module} from '@nestjs/common';
import {CoreModule} from '../core/core.module';
import {UsersService} from './users.service';
import {MongooseModule} from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  exports: [UsersService],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}