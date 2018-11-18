import {Body, Controller, Get, Post, UnauthorizedException, UseGuards} from '@nestjs/common';
import {ApiOperation} from '@nestjs/swagger';
import {LoginDto} from './dto/login.dto';
import {UsersService} from '../users/services/users.service';
import {Messages} from '../../helpers/enums/messages.enum';
import {JwtResponse} from './interfaces/jwt-response';
import {AuthService} from './auth.service';
import {HashService} from '../core/services/hash.service';
import {ExchangeTokenDto} from './dto/exchangeToken.dto';
import {AuthGuard} from '@nestjs/passport';
import {ReqUser} from '../../helpers/decorators/user.decorator';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiOperation({ title: 'Login for generating access token' })
  async login(@Body() payload: LoginDto): Promise<JwtResponse> {
    const user = await this.usersService.findOneByEmail(payload.email, true);

    if (!user) {
      throw new UnauthorizedException(Messages.USER_NOT_FOUND);
    }

    const isValidPassword = await this.hashService.compareHash(payload.password, user.password);

    if (!isValidPassword)  {
      throw new UnauthorizedException(Messages.INVALID_PASSWORD);
    }

    return await this.authService.singIn(user);
  }

  @Post('token')
  @ApiOperation({ title: 'Exchange refresh token for new access token' })
  async exchangeToken(@Body() payload: ExchangeTokenDto): Promise<JwtResponse> {
   return await this.authService.exchangeToken(payload.refreshToken);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ title: 'Login via google' })
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@ReqUser() user: any) {
    console.log(user);
  }
}