import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from '../core/core.module';
import { UserHashesService } from './user-hashes.service';
import { UserHashSchema } from './user-hash.schema';
import { UserHashesRepository } from './user-hashes.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserHash', schema: UserHashSchema }]),
    CoreModule,
  ],
  providers: [UserHashesService, UserHashesRepository],
  exports: [UserHashesService],
})
export class UserHashesModule {}