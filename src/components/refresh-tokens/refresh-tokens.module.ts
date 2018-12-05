import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RefreshTokensService } from './refresh-tokens.service';
import { RefreshToken } from './refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    AuthModule
  ],
  controllers: [],
  exports: [RefreshTokensService],
  providers: [RefreshTokensService]
})
export class RefreshTokensModule {}