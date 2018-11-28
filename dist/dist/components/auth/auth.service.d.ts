import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/user.entity';
import { UsersService } from '../users/services/users.service';
import { JwtResponse } from './interfaces/jwt-response';
import { RefreshToken } from './entities/RefreshToken.entity';
import { Repository } from 'typeorm';
import { UserHashesService } from '../user-hashes/user-hashes.service';
import { EmailSendingService } from '../core/services/email-sending.service';
import { EmailTemplatesService } from '../core/services/email-templates.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly userHashesService;
    private readonly emailSendingService;
    private readonly emailTemplatesService;
    private readonly refreshTokensRepository;
    constructor(usersService: UsersService, jwtService: JwtService, userHashesService: UserHashesService, emailSendingService: EmailSendingService, emailTemplatesService: EmailTemplatesService, refreshTokensRepository: Repository<RefreshToken>);
    singIn(user: User): Promise<JwtResponse>;
    validateUser(payload: JwtPayload): Promise<User | undefined>;
    exchangeToken(token: string): Promise<JwtResponse>;
    verifyEmail({ firstName, lastName, email, id }: User): Promise<void>;
    decodeToken(token: string): JwtPayload;
    resetPassword({ firstName, lastName, email, id }: User): Promise<void>;
}
