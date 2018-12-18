import { TemplateTypes } from '../../../helpers/enums/template-types.enum';
export declare class EmailTemplatesService {
    getTemplate(type: TemplateTypes, data: object): string;
    private renderTemplate;
    createSubject(title: string): string;
}
