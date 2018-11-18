import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-google-oauth20';
import {GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from '../../../config/index';
import {UsersService} from '../../users/services/users.service';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private usersService: UsersService,
  ) {
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ['openid', 'email'],
    });
  }

  async validate(req: Request, acessToken: string, refreshToken: string, profile: any, done: Function): Promise<void> {
    try {
      const user = await this.usersService.create();
    } catch (e) {
      done(e, false);
    }
  }

}