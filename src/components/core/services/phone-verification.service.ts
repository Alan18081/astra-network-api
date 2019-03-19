import { Injectable } from '@nestjs/common';
import { Client } from 'authy-client';
import { AUTHY_PRODUCTION_KEY } from '../../../config';

@Injectable()
export class PhoneVerificationService {

  authy: Client;

  constructor() {
    this.authy = new Client({ key: AUTHY_PRODUCTION_KEY });
  }

  async sendVerificationSMS(authyId: string) {
    return this.authy.requestSms({ authyId });
  }

  async registerAuthyUser(email: string, countryCode: string, phone: string): Promise<any> {
    return this.authy.registerUser({
      email,
      countryCode,
      phone
    });
  }

  async verifyPhoneCode(authyId: string, code: string): Promise<boolean> {
    try {
      await this.authy.verifyToken({ authyId, token: code });
      return true;
    } catch (e) {
      return false;
    }
  }
}