import {Email} from './email.abstract';

export class VerificationEmail extends Email {
  constructor(from: string, to: string, subject: string, html: string) {
    super(from, to, subject);
    this.html =
  }
}