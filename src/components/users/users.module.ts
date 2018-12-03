import {Module} from '@nestjs/common';
import {CoreModule} from '../core/core.module';
import {User} from './user.entity';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}