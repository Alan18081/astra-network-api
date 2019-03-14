import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { JwtResponse } from './interfaces/jwt-response';
import { LoginDto } from './dto/login.dto';

@Resolver()
export class AuthResolver {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Mutation('login')
  async login(@Args('input') loginDto: LoginDto): Promise<JwtResponse> {
    return this.authService.login(loginDto);
  }

}