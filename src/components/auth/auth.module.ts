import {Global, Module} from '@nestjs/common';
import {UsersModule} from '../users/users.module';
import {PassportModule} from '@nestjs/passport';
import {AuthService} from './auth.service';
import { CoreModule } from '../core/core.module';
import { RefreshTokensModule } from '../refresh-tokens/refresh-tokens.module';
import {CustomJwtModule} from "../custom-jwt/custom-jwt.module";

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CustomJwtModule,
    UsersModule,
    CoreModule,
    RefreshTokensModule,
  ],
  exports: [AuthService, CustomJwtModule],
  providers: [
    AuthService,
  ],
})
export class AuthModule {}
