import { mysqlEnum, mysqlTable, text, timestamp } from 'drizzle-orm/mysql-core';

import { EmailTemplateTypes } from '../enums';

export const emailTemplatesEntity = mysqlTable('email_templates', {
  type: mysqlEnum(
    'type',
    Object.values(EmailTemplateTypes) as [
      EmailTemplateTypes,
      ...EmailTemplateTypes[],
    ],
  ).notNull(),
  html: text().unique().notNull(),
  updated_at: timestamp().onUpdateNow(),
  created_at: timestamp().defaultNow(),
});
