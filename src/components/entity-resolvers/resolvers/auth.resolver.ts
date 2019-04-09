import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../../auth/auth.service';
import { JwtResponse } from '../../auth/interfaces/jwt-response';
import { LoginDto } from '../../auth/dto/login.dto';
import { User } from '../../users/user.interface';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../helpers/guards/auth.guard';
import { ReqUser } from '../../../helpers/decorators/user.decorator';
import { SendPhoneVerificationCodeDto } from '../../auth/dto/send-phone-verification-code.dto';
import { VerifyPhoneVerificationCodeDto } from '../../auth/dto/verify-phone-verification-code.dto';

@Resolver()
export class AuthResolver {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Mutation('login')
  async login(@Args('input') loginDto: LoginDto): Promise<JwtResponse> {
    return this.authService.login(loginDto);
  }

  @Mutation('exchangeToken')
  async exchangeToken(@Args('refreshToken') token: string): Promise<JwtResponse> {
    return this.authService.exchangeToken(token);
  }

  @Mutation('sendPhoneVerificationCode')
  @UseGuards(GqlAuthGuard)
  async sendPhoneVerificationCode(@ReqUser() user: User, @Args('input') dto: SendPhoneVerificationCodeDto): Promise<User | null> {
    return this.authService.sendPhoneVerificationCode(user, dto);
  }

  @Mutation('verifyPhoneVerificationCode')
  @UseGuards(GqlAuthGuard)
  async verifyPhoneVerificationCode(@ReqUser() user: User, @Args('input') dto: VerifyPhoneVerificationCodeDto): Promise<User | null> {
    return this.authService.verifyPhoneVerificationCode(user, dto.code);
  }

}