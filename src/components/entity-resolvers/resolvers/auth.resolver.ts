import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../../auth/auth.service';
import { JwtResponse } from '../../auth/interfaces/jwt-response';
import { LoginDto } from '../../auth/dto/login.dto';

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

}