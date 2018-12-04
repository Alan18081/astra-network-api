import { Test } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { JwtResponse } from '../interfaces/jwt-response';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.entity';
import { HashService } from '../../core/services/hash.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Messages } from '../../../helpers/enums/messages.enum';

describe('AuthController', () => {
  let authController, authService;
  const mockUsersService = {
    findOneByEmail() {}
  };

  const mockAuthService = {
    async signIn() {}
  };

  const mockHashService = {
    async compareHash() {}
  };

  const mockUser = {
    ...new User(),
    firstName: 'Alan',
    lastName: 'Morgan',
    googleId: 12,
    email: 'test@gmail.com',
  };

  const mockUserWithPassword = {
    ...mockUser,
    password: 'Some password'
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
    }).overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .overrideProvider(HashService)
      .useValue(mockHashService)
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    const payload: LoginDto = {
      email: 'test@gmail.com',
      password: '123456',
    };

    const jwtResponse: JwtResponse = {
      accessToken: 'Access token',
      refreshToken: 'Refresh token',
      expiresIn: 4500
    };

    jest.spyOn(mockAuthService, 'signIn').mockImplementation(() => jwtResponse);

    it('should return token\'s info if credentials valid and user is found', async () => {
      jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(() => mockUserWithPassword);
      jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => true);

      expect(await authController.login(payload)).toEqual(jwtResponse);
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(() => undefined);

      try {
        await authController.login(payload);
        expect(false);
      } catch (e) {
        expect(JSON.stringify(e)).toEqual(JSON.stringify(new UnauthorizedException(Messages.USER_NOT_FOUND)));
      }
    });

    it('should throw an error if user doesn\'t have password', async () => {
      jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(() => mockUser);
      
      try {
        await authController.login(payload);
        expect(false);
      } catch (e) {
        expect(JSON.stringify(e)).toEqual(JSON.stringify(new BadRequestException(Messages.USER_DOESNT_HAVE_PASSWORD)));
      }
    });

  });

});