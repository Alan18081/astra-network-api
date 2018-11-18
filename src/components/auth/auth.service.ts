import {Injectable, NotFoundException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {JwtPayload} from './interfaces/jwt-payload.interface';
import {User} from '../users/entities/user.entity';
import {UsersService} from '../users/services/users.service';
import {JwtResponse} from './interfaces/jwt-response';
import {HashService} from '../core/services/hash.service';
import {JWT_EXPIRES} from '../../config/index';
import {InjectRepository} from '@nestjs/typeorm';
import {RefreshToken} from './entities/RefreshToken.entity';
import {Repository} from 'typeorm';
import {Messages} from '../../helpers/enums/messages.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokensRepository: Repository<RefreshToken>,
  ) {}

  async singIn(user: User): Promise<JwtResponse> {
    const jwtPayload: JwtPayload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(jwtPayload);
    const refreshToken = await this.hashService.generateHash(JSON.stringify(jwtPayload));

    const refreshTokenRecord = new RefreshToken();
    refreshTokenRecord.token = refreshToken;
    refreshTokenRecord.user = user;

    await this.refreshTokensRepository.save(refreshTokenRecord);

    return {
      accessToken,
      refreshToken,
      expiresIn: JWT_EXPIRES,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
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
}