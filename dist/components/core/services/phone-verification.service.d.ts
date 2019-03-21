import { Client } from 'authy-client';
export declare class PhoneVerificationService {
    authy: Client;
    constructor();
    sendVerificationSMS(authyId: string): Promise<any>;
    registerAuthyUser(email: string, countryCode: string, phone: string): Promise<any>;
    verifyPhoneCode(authyId: string, code: string): Promise<boolean>;
}
