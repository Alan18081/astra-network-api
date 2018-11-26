import {Injectable} from '@nestjs/common';
import * as sgEmail from '@sendgrid/mail';
import {SENDGRID_KEY} from '../../../config/index';
import { MailService } from '@sendgrid/mail';

@Injectable()
export class EmailSendingService {

  private readonly client: MailService = sgEmail;

  constructor() {
    this.client.setApiKey(SENDGRID_KEY);
  }

  async sendEmail(email: string, subject: string, template: string): Promise<> {

  }

}