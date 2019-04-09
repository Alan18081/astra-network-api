import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../components/auth/auth.service';
export declare class GqlAuthGuard implements CanActivate {
    private readonly authService;
    private readonly jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
