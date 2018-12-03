import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as elasticemail from 'elasticemail';
import { EMAIL_USERNAME, EMAIL_API_KEY, SYSTEM_EMAIL, APP_NAME } from '../../../config';

@Injectable()
export class EmailSendingService {

  private readonly client: any;

  constructor() {
    this.client = elasticemail.createClient({
      username: EMAIL_USERNAME,
      apiKey: EMAIL_API_KEY,
    })
  }

  async sendSystemEmail(email: string, subject: string, template: string): Promise<void> {
    try {
      await this.send({
        from: SYSTEM_EMAIL,
        from_name: APP_NAME,
        to: email,
        subject,
        body_html: template,
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  send(config: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.mailer.send(config, (err, result) => {
        if(err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  }

}