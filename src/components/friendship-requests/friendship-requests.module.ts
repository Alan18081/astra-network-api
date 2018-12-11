import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { FriendshipRequestsGateway } from './friendship-requests.gateway';
import { FriendshipRequestsService } from './friendship-requests.service';
import { FriendshipRequest } from './friendship-request.entity';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendshipRequest]),
    UsersModule,
    CoreModule,
  ],
  providers: [FriendshipRequestsGateway, FriendshipRequestsService]
})
export class FriendshipRequestsModule {}