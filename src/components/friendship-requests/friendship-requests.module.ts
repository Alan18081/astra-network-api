import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { FriendshipRequestsService } from './friendship-requests.service';
import { CoreModule } from '../core/core.module';
import { FriendshipRequestSchema } from './friendship-request.schema';
import { FriendshipRequestsRepository } from './friendship-requests.repository';
import {FriendshipRequestsResolver} from './friendship-requests.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'FriendshipRequest', schema: FriendshipRequestSchema}]),
    UsersModule,
    CoreModule,
  ],
  providers: [
      FriendshipRequestsService,
      FriendshipRequestsRepository,
      FriendshipRequestsResolver
  ]
})
export class FriendshipRequestsModule {}