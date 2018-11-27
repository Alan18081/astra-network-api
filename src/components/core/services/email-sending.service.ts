import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sgEmail from '@sendgrid/mail';
import { SENDGRID_KEY, SYSTEM_EMAIL } from '../../../config';

@Injectable()
export class EmailSendingService {

  private readonly client = sgEmail;

  constructor() {
    this.client.setApiKey(SENDGRID_KEY);
  }

  async sendSystemEmail(email: string, subject: string, template: string): Promise<void> {
    try {
      await this.client.send({
        from: SYSTEM_EMAIL,
        to: email,
        subject,
        html: template,
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

}