import {Module} from '@nestjs/common';
import {CoreModule} from '../core/core.module';
import {UserRole} from './entities/user-role.entity';
import {User} from './user.entity';
import {UsersService} from './services/users.service';
import {UsersController} from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forFeature([User, UserRole]),
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}