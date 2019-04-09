import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokensService } from './refresh-tokens.service';
import { RefreshTokenSchema } from './refresh-token.schema';
import { RefreshTokensRepository } from './refresh-tokens.repository';
import {CustomJwtModule} from '../custom-jwt/custom-jwt.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'RefreshToken', schema: RefreshTokenSchema }]),
    CustomJwtModule
  ],
  controllers: [],
  exports: [RefreshTokensService],
  providers: [RefreshTokensService, RefreshTokensRepository]
})
export class RefreshTokensModule {}