import { Global, Module } from '@nestjs/common';
import {UsersModule} from '../users/users.module';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {JWT_EXPIRES, JWT_SECRET} from '../../config';
import {AuthService} from './auth.service';
import {GoogleStrategy} from './strategies/google.strategy';
import { CoreModule } from '../core/core.module';
import { RefreshTokensModule } from '../refresh-tokens/refresh-tokens.module';
import { AuthResolver } from './auth.resolver';
import {UserHashesModule} from '../user-hashes/user-hashes.module';

@Global()
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
    RefreshTokensModule,
  ],
  exports: [AuthService, JwtModule],
  providers: [
    AuthService,
    GoogleStrategy,
    AuthResolver,
  ],
})
export class AuthModule {}