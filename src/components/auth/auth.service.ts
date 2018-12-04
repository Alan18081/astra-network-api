import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtResponse } from './interfaces/jwt-response';
import { JWT_EXPIRES } from '../../config';
import { Messages } from '../../helpers/enums/messages.enum';
import { UserHashesService } from '../user-hashes/user-hashes.service';
import { HashTypes } from '../../helpers/enums/hash-types.enum';
import { EmailSendingService } from '../core/services/email-sending.service';
import { EmailTemplatesService } from '../core/services/email-templates.service';
import { TemplateTypes } from '../../helpers/enums/template-types.enum';
import { EmailTitles } from '../../helpers/enums/email-titles.enum';
import { WsException } from '@nestjs/websockets';
import {HOST, PORT} from '../../config';
import { SetNewPasswordDto } from './dto/set-new-password.dto';
import { RefreshTokensService } from '../refresh-token/refresh-tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly userHashesService: UserHashesService,
    private readonly emailSendingService: EmailSendingService,
    private readonly emailTemplatesService: EmailTemplatesService,
    private readonly refreshTokensService: RefreshTokensService,
  ) {}

  async singIn(user: User): Promise<JwtResponse> {
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

  async validateUser(payload: JwtPayload): Promise<User | undefined> {
    return await this.usersService.findOneByEmail(payload.email);
  }

  async exchangeToken(token: string): Promise<JwtResponse> {
    const tokenRecord = await this.refreshTokensService.findOneByToken(token);

    if (!tokenRecord) {
      throw new NotFoundException(Messages.REFRESH_TOKEN_NOT_FOUND);
    }

    await this.refreshTokensService.deleteOne(tokenRecord.id);

    return await this.singIn(tokenRecord.user);
  }

  async verifyEmail({ firstName, lastName, email, id }: User): Promise<void> {
    const emailHash = await this.userHashesService.createOne(id, HashTypes.EMAIL_VERIFICATION);
    const content = this.emailTemplatesService.getTemplate(TemplateTypes.EMAIL_VERIFICATION, {
      firstName,
      lastName,
      url: `http://${HOST}:${PORT}/auth/verifyEmail/hash/${emailHash.hash}`,
    });
    await this.emailSendingService.sendSystemEmail(
      email,
      this.emailTemplatesService.createSubject(EmailTitles.EMAIL_VERIFICATION),
      content,
    );
  }

  async verifyEmailHash(hash: string): Promise<void> {
    const userHash = await this.userHashesService.findOneByHash(hash);
    if(!userHash) {
      throw new NotFoundException(Messages.EMAIL_VERIFICATION_HASH_NOT_FOUND);
    }

    await Promise.all([
      this.usersService.updateOne(userHash.userId, { emailVerified: true }),
      this.userHashesService.deleteOne(userHash.id)
    ]);
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
    const content = this.emailTemplatesService.getTemplate(TemplateTypes.RESET_PASSWORD, {
      firstName,
      lastName,
    });
    await this.emailSendingService.sendSystemEmail(
      email,
      this.emailTemplatesService.createSubject(EmailTitles.RESET_PASSWORD),
      content
    );
  }

  async setNewPassword({ hash, password }: SetNewPasswordDto): Promise<void> {
    const userHash = await this.userHashesService.findOneByHash(hash);

    if(!userHash) {
      throw new NotFoundException(Messages.RESET_PASSWORD_HASH_NOT_FOUND);
    }

    await Promise.all([
      this.usersService.setNewPassword(userHash.userId, password),
      this.userHashesService.deleteOne(userHash.id)
    ]);
  }
}