import {EmailTypes} from './enums/email-types.enum';
import { compile } from 'pug';
import {Injectable} from '@nestjs/common';

@Injectable()
export class TemplateGenerator {

  public getTemplate(filename: string, data: object) {
    return compile(filename, data);
  }

}