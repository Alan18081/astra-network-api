import { AuthService } from '../../auth/auth.service';
import { JwtResponse } from '../../auth/interfaces/jwt-response';
import { LoginDto } from '../../auth/dto/login.dto';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<JwtResponse>;
    exchangeToken(token: string): Promise<JwtResponse>;
}
