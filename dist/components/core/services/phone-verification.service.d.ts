import { Client } from 'authy-client';
import { ConfigService } from "./config.service";
export declare class PhoneVerificationService {
    private readonly configService;
    authy: Client;
    constructor(configService: ConfigService);
    sendVerificationSMS(authyId: string): Promise<any>;
    registerAuthyUser(email: string, countryCode: string, phone: string): Promise<any>;
    verifyPhoneCode(authyId: string, code: string): Promise<boolean>;
}
