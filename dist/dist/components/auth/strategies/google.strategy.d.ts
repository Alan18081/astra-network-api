import { UsersService } from '../../users/services/users.service';
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(req: Request, acessToken: string, refreshToken: string, profile: any, done: Function): Promise<any>;
}
export {};
