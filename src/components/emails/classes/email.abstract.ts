export abstract class Email {

  public from: string;
  public to: string;

  public subject: string;

  public html: string;

  constructor(from: string, to: string, subject: string) {
    this.from = from;
    this.to = to;
    this.subject = subject;
  }

}