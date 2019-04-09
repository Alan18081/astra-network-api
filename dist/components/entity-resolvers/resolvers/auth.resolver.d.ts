import { AuthService } from '../../auth/auth.service';
import { JwtResponse } from '../../auth/interfaces/jwt-response';
import { LoginDto } from '../../auth/dto/login.dto';
import { User } from '../../users/user.interface';
import { SendPhoneVerificationCodeDto } from '../../auth/dto/send-phone-verification-code.dto';
import { VerifyPhoneVerificationCodeDto } from '../../auth/dto/verify-phone-verification-code.dto';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<JwtResponse>;
    exchangeToken(token: string): Promise<JwtResponse>;
    sendPhoneVerificationCode(user: User, dto: SendPhoneVerificationCodeDto): Promise<User | null>;
    verifyPhoneVerificationCode(user: User, dto: VerifyPhoneVerificationCodeDto): Promise<User | null>;
}
