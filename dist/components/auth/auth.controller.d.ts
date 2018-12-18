import { UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtResponse } from './interfaces/jwt-response';
import { AuthService } from './auth.service';
import { HashService } from '../core/services/hash.service';
import { ExchangeTokenDto } from './dto/exchangeToken.dto';
import { User } from '../users/user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SetNewPasswordDto } from './dto/set-new-password.dto';
export declare class AuthController {
    private readonly usersService;
    private readonly hashService;
    private readonly authService;
    constructor(usersService: UsersService, hashService: HashService, authService: AuthService);
    login(payload: LoginDto): Promise<JwtResponse>;
    exchangeToken(payload: ExchangeTokenDto): Promise<JwtResponse>;
    googleLogin(): void;
    googleLoginCallback(user: User | null, res: Response): void;
    googleSuccess(userId: string | number): Promise<JwtResponse | void>;
    googleFail(): Promise<UnauthorizedException>;
    changePassword(user: User, payload: ChangePasswordDto): Promise<void>;
    verifyEmail(user: User): Promise<void>;
    verifyEmailHash(hash: string): Promise<void>;
    resetPassword(body: ResetPasswordDto): Promise<void>;
    setNewPassword(body: SetNewPasswordDto): Promise<void>;
}
