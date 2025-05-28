import { EmailTemplateTypes } from '../enums';

export class EmailTemplateEntity {
  type: EmailTemplateTypes;
  html: string;
  updated_at: Date | string;
  created_at: Date | string;
}
