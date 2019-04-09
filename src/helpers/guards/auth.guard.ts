import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../components/auth/auth.service';
import { Messages } from '../enums/messages.enum';
import { JwtPayload } from '../../components/auth/interfaces/jwt-payload.interface';

@Injectable()
export class GqlAuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const {req} = ctx.getContext();
    const { authorization } = req.headers;

    if(!authorization) {
      throw new UnauthorizedException(Messages.INVALID_TOKEN);
    }

    const token: string = authorization.split(' ')[1];
    const payload = this.jwtService.verify(token) as JwtPayload;

    if(!payload) {
      throw new UnauthorizedException(Messages.INVALID_TOKEN);
    }

    ctx.getContext().user = await this.authService.validateUser(payload);
    return true;
  }


}