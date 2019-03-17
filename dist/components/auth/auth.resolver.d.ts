import { AuthService } from './auth.service';
import { JwtResponse } from './interfaces/jwt-response';
import { LoginDto } from './dto/login.dto';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<JwtResponse>;
    exchangeToken(token: string): Promise<JwtResponse>;
}
