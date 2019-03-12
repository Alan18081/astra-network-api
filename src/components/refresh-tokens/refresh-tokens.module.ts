import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokensService } from './refresh-tokens.service';
import { JWT_EXPIRES, JWT_SECRET } from '../../config';
import { RefreshTokenSchema } from './refresh-token.schema';
import { RefreshTokensRepository } from './refresh-tokens.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'RefreshToken', schema: RefreshTokenSchema }]),
    JwtModule.register({
      secretOrPrivateKey: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRES,
      },
    }),
  ],
  controllers: [],
  exports: [RefreshTokensService],
  providers: [RefreshTokensService, RefreshTokensRepository]
})
export class RefreshTokensModule {}