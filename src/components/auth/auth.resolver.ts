import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { JwtResponse } from './interfaces/jwt-response';

@Resolver()
export class AuthResolver {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Mutation('login')
  async login(): Promise<JwtResponse> {

  }

}