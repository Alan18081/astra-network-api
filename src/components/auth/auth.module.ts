import {Module} from '@nestjs/common';
import {UsersModule} from '../users/users.module';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {JWT_EXPIRES, JWT_SECRET} from '../../config/index';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RefreshToken} from './entities/RefreshToken.entity';
import {JwtStrategy} from './strategies/jwt.strategy';
import {GoogleStrategy} from './strategies/google.strategy';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRES,
      },
    }),
    UsersModule,
    CoreModule,
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  exports: [],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}