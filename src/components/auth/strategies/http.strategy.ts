import {Injectable, UnauthorizedException} from '@nestjs/common';
import {Strategy, ExtractJwt} from 'passport-http-bearer';
import {PassportStrategy} from '@nestjs/passport';
import {AuthService} from '../auth.service';
import {JWT_SECRET} from '../../../config/index';
import {JwtPayload} from '../interfaces/jwt-payload.interface';
import {User} from '../../users/user.entity';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

}