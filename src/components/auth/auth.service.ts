import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/user.entity';
import { UsersService } from '../users/services/users.service';
import { JwtResponse } from './interfaces/jwt-response';
import { JWT_EXPIRES } from '../../config';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/RefreshToken.entity';
import { Repository } from 'typeorm';
import { Messages } from '../../helpers/enums/messages.enum';
import * as uid from 'uid-safe';
import { UserHashesService } from '../user-hashes/user-hashes.service';
import { HashTypes } from '../../helpers/enums/hash-types.enum';
import { EmailSendingService } from '../core/services/email-sending.service';
import { EmailTemplatesService } from '../core/services/email-templates.service';
import { TemplateTypes } from '../../helpers/enums/template-types.enum';
import { EmailTitles } from '../../helpers/enums/email-titles.enum';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly userHashesService: UserHashesService,
    private readonly emailSendingService: EmailSendingService,
    private readonly emailTemplatesService: EmailTemplatesService,
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

  async verifyEmail({ firstName, lastName, email, id }: User): Promise<void> {
    await this.userHashesService.createOne(id, HashTypes.EMAIL_VERIFICATION);
    const content = this.emailTemplatesService.getTemplate(TemplateTypes.EMAIL_VERIFICATION, {
      firstName,
      lastName,
    });
    await this.emailSendingService.sendSystemEmail(
      email,
      this.emailTemplatesService.createSubject(EmailTitles.EMAIL_VERIFICATION),
      content,
    );
  }

  decodeToken(token: string): string | { [key: string]: any } | null {
    const res = this.jwtService.decode(token, {});

    if(!res || typeof res !== 'object') {
      throw new WsException(Messages.INVALID_TOKEN);
    }
    delete res.iat;
    delete res.exp;

    return res;
  }

  async resetPassword({ firstName, lastName, email, id }: User): Promise<void> {
    await this.userHashesService.createOne(id, HashTypes.RESET_PASSWORD);
    const content = this.emailTemplatesService.getTemplate(TemplateTypes.EMAIL_VERIFICATION, {
      firstName,
      lastName,
    });
    await this.emailSendingService.sendSystemEmail(
      email,
      this.emailTemplatesService.createSubject(EmailTitles.RESET_PASSWORD),
      content
    );
  }
}