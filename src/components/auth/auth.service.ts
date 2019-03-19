import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/user.interface';
import { UsersService } from '../users/users.service';
import { JwtResponse } from './interfaces/jwt-response';
import { JWT_EXPIRES } from '../../config';
import { Messages } from '../../helpers/enums/messages.enum';
import { EmailSendingService } from '../core/services/email-sending.service';
import { EmailTemplatesService } from '../core/services/email-templates.service';
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service';
import { LoginDto } from './dto/login.dto';
import { HashService } from '../core/services/hash.service';
import { PhoneVerificationService } from '../core/services/phone-verification.service';
import { SendPhoneVerificationCodeDto } from './dto/send-phone-verification-code.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly emailSendingService: EmailSendingService,
    private readonly emailTemplatesService: EmailTemplatesService,
    private readonly refreshTokensService: RefreshTokensService,
    private readonly phoneVerificationService: PhoneVerificationService,
  ) {}

  async login(loginDto: LoginDto): Promise<JwtResponse> {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException(Messages.USER_NOT_FOUND);
    }

    if(!user.password) {
      throw new BadRequestException(Messages.USER_DOESNT_HAVE_PASSWORD);
    }

    const isValidPassword = await this.hashService.compareHash(loginDto.password, user.password);

    if (!isValidPassword)  {
      throw new UnauthorizedException(Messages.INVALID_PASSWORD);
    }

    return this.signIn(user);
  }

  async signIn(user: User): Promise<JwtResponse> {
    const jwtPayload: JwtPayload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(jwtPayload);

    const refreshTokenRecord = await this.refreshTokensService.findOneByUserId(user.id);

    if (refreshTokenRecord) {
      return {
        accessToken,
        refreshToken: refreshTokenRecord.token,
        expiresIn: JWT_EXPIRES,
      };
    }

    const newRefreshTokenRecord = await this.refreshTokensService.createOne({
      userId: user.id,
      accessToken
    });

    return {
      accessToken,
      refreshToken: newRefreshTokenRecord.token,
      expiresIn: JWT_EXPIRES,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {
    return this.usersService.findOneByEmail(payload.email);
  }

  async exchangeToken(token: string): Promise<JwtResponse> {
    const tokenRecord = await this.refreshTokensService.findOneByToken(token);

    if (!tokenRecord) {
      throw new NotFoundException(Messages.REFRESH_TOKEN_NOT_FOUND);
    }

    const [user] = await Promise.all([
        this.usersService.findOne(tokenRecord.user),
        this.refreshTokensService.deleteOne(tokenRecord.id),
    ]);

    return await this.signIn(user);
  }

  async sendPhoneVerificationCode(user: User, {countryCode, phone}: SendPhoneVerificationCodeDto): Promise<User | null> {
    if(user.phoneVerified) {
      throw new ConflictException(Messages.PHONE_HAVE_ALREADY_BEEN_VERIFIED);
    }

    if(!user.authyId) {
      const authyId = await this.phoneVerificationService.registerAuthyUser(user.email, countryCode, phone);
      const updatedUser = await this.usersService.setAuthyId(user._id, authyId);
      if(updatedUser) {
        await this.phoneVerificationService.sendVerificationSMS(authyId);
      }
      return updatedUser;
    }

    await this.phoneVerificationService.sendVerificationSMS(user.authyId);
    return user;

  }

  async verifyPhoneVerificationCode(user: User, code: string): Promise<User | null> {
    if(user.phoneVerified) {
      throw new ConflictException(Messages.PHONE_HAVE_ALREADY_BEEN_VERIFIED);
    }

    if(!user.authyId) {
      throw new BadRequestException(Messages.REQUIRES_TO_SEND_VERIFICATION_CODE_FIRST);
    }

    const isVerified = await this.phoneVerificationService.verifyPhoneCode(user.authyId, code);

    if(!isVerified) {
      throw new BadRequestException(Messages.INVALID_PHONE_VERIFICATION_CODE);
    }

    return this.usersService.setPhoneVerified(user._id);
  }
}