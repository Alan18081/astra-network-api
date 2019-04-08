import { Injectable } from '@nestjs/common';
import { Client } from 'authy-client';
import {ConfigService} from "./config.service";

@Injectable()
export class PhoneVerificationService {

  authy: Client;

  constructor(private readonly configService: ConfigService) {
    this.authy = new Client({ key: configService.get('AUTHY_PRODUCTION_KEY') });
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