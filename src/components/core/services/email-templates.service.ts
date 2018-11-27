import { Injectable } from '@nestjs/common';
import { TemplateTypes } from '../../../helpers/enums/template-types.enum';
import { compileFile, compileTemplate } from 'pug';
import { join } from 'path';
import { EMAIL_TEMPLATES_FOLDER } from '../../../config';

@Injectable()
export class EmailTemplatesService {

  getTemplate(type: TemplateTypes, data: object): string {
    switch (type) {
      case TemplateTypes.EMAIL_VERIFICATION:
        return this.renderTemplate('email-verification')(data);

      case TemplateTypes.RESET_PASSWORD:
        return this.renderTemplate('reset-password')(data);
    }
  }

  private renderTemplate(filename: string): compileTemplate {
    return compileFile(join(EMAIL_TEMPLATES_FOLDER, `${filename}.pug`));
  }

}