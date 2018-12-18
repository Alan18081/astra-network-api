import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtResponse } from './interfaces/jwt-response';
import { UserHashesService } from '../user-hashes/user-hashes.service';
import { EmailSendingService } from '../core/services/email-sending.service';
import { EmailTemplatesService } from '../core/services/email-templates.service';
import { SetNewPasswordDto } from './dto/set-new-password.dto';
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly userHashesService;
    private readonly emailSendingService;
    private readonly emailTemplatesService;
    private readonly refreshTokensService;
    constructor(usersService: UsersService, jwtService: JwtService, userHashesService: UserHashesService, emailSendingService: EmailSendingService, emailTemplatesService: EmailTemplatesService, refreshTokensService: RefreshTokensService);
    signIn(user: User): Promise<JwtResponse>;
    validateUser(payload: JwtPayload): Promise<User | undefined>;
    exchangeToken(token: string): Promise<JwtResponse>;
    verifyEmail({ firstName, lastName, email, id }: User): Promise<void>;
    verifyEmailHash(hash: string): Promise<void>;
    decodeToken(token: string): string | {
        [key: string]: any;
    } | null;
    resetPassword({ firstName, lastName, email, id }: User): Promise<void>;
    setNewPassword({ hash, password }: SetNewPasswordDto): Promise<void>;
}
