import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/user.entity';
import { UsersService } from '../users/services/users.service';
import { JwtResponse } from './interfaces/jwt-response';
import { JWT_EXPIRES } from '../../config/index';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/RefreshToken.entity';
import { Repository } from 'typeorm';
import { Messages } from '../../helpers/enums/messages.enum';
import * as uid from 'uid-safe';
import { EmailVerification } from '../email-verification/email-verification.entity';
import { UserHashesService } from '../user-hashes/user-hashes.service';
import { HashTypes } from '../../helpers/enums/hash-types.enum';
import { EmailSendingService } from '../core/services/email-sending.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly userHashesService: UserHashesService,
    private readonly emailSendingService: EmailSendingService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokensRepository: Repository<RefreshToken>,
  ) {}

  async singIn(user: User): Promise<JwtResponse> {
    const jwtPayload: JwtPayload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(jwtPayload);

    const refreshTokenRecord = await this.refreshTokensRepository.findOne({ user });

    if (refreshTokenRecord) {
      return {
        accessToken,
        refreshToken: refreshTokenRecord.token,
        expiresIn: JWT_EXPIRES,
      };
    }

    const refreshToken = uid.sync(30);

    const newRefreshTokenRecord = new RefreshToken();
    newRefreshTokenRecord.token = refreshToken;
    newRefreshTokenRecord.user = user;

    await this.refreshTokensRepository.save(newRefreshTokenRecord);

    return {
      accessToken,
      refreshToken,
      expiresIn: JWT_EXPIRES,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User | undefined> {
    return await this.usersService.findOneByEmail(payload.email);
  }

  async exchangeToken(token: string): Promise<JwtResponse> {
    const tokenRecord = await this.refreshTokensRepository.findOne(
      { token },
      { relations: ['user'] },
    );

    if (!tokenRecord) {
      throw new NotFoundException(Messages.REFRESH_TOKEN_NOT_FOUND);
    }

    await this.refreshTokensRepository.delete(tokenRecord.id);

    return await this.singIn(tokenRecord.user);
  }

  async verifyEmail(userId: number, email: string): Promise<void> {
    const userHash = await this.userHashesService.createOne(userId, HashTypes.EMAIL_VERIFICATION));
    await this.emailSendingService.sendSystemEmail(email);
  }
  }
}