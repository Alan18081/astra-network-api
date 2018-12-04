import {Module} from '@nestjs/common';
import {UsersModule} from '../users/users.module';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {JWT_EXPIRES, JWT_SECRET} from '../../config';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtStrategy} from './strategies/jwt.strategy';
import {GoogleStrategy} from './strategies/google.strategy';
import { CoreModule } from '../core/core.module';
import {UserHashesModule} from '../user-hashes/user-hashes.module';

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
    UserHashesModule,
  ],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}