import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/user.interface';
import { UsersService } from '../users/users.service';
import { JwtResponse } from './interfaces/jwt-response';
import { EmailSendingService } from '../core/services/email-sending.service';
import { EmailTemplatesService } from '../core/services/email-templates.service';
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service';
import { LoginDto } from './dto/login.dto';
import { HashService } from '../core/services/hash.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly hashService;
    private readonly emailSendingService;
    private readonly emailTemplatesService;
    private readonly refreshTokensService;
    constructor(usersService: UsersService, jwtService: JwtService, hashService: HashService, emailSendingService: EmailSendingService, emailTemplatesService: EmailTemplatesService, refreshTokensService: RefreshTokensService);
    login(loginDto: LoginDto): Promise<JwtResponse>;
    signIn(user: User): Promise<JwtResponse>;
    validateUser(payload: JwtPayload): Promise<User | null>;
    exchangeToken(token: string): Promise<JwtResponse>;
    decodeToken(token: string): string | {
        [key: string]: any;
    } | null;
}
