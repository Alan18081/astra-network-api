import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/user.interface';
import { UsersService } from '../users/users.service';
import { JwtResponse } from './interfaces/jwt-response';
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service';
import { LoginDto } from './dto/login.dto';
import { HashService } from '../core/services/hash.service';
import { PhoneVerificationService } from '../core/services/phone-verification.service';
import { SendPhoneVerificationCodeDto } from './dto/send-phone-verification-code.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly hashService;
    private readonly refreshTokensService;
    private readonly phoneVerificationService;
    constructor(usersService: UsersService, jwtService: JwtService, hashService: HashService, refreshTokensService: RefreshTokensService, phoneVerificationService: PhoneVerificationService);
    login(loginDto: LoginDto): Promise<JwtResponse>;
    signIn(user: User): Promise<JwtResponse>;
    validateUser(payload: JwtPayload): Promise<User | null>;
    exchangeToken(token: string): Promise<JwtResponse>;
    sendPhoneVerificationCode(user: User, { countryCode, phone }: SendPhoneVerificationCodeDto): Promise<User | null>;
    verifyPhoneVerificationCode(user: User, code: string): Promise<User | null>;
}
