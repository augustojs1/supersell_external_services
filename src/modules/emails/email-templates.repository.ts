import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';

import * as schemas from '@/infra/database/orm/drizzle/schema';
import { EmailTemplateTypes } from './enums';
import { EmailTemplateEntity } from './models';

@Injectable()
export class EmailTemplatesRepository {
  constructor(
    @Inject('DB_DEV')
    private readonly drizzle: MySql2Database,
  ) {}

  public async findByType(
    type: EmailTemplateTypes,
  ): Promise<EmailTemplateEntity | null> {
    const result = await this.drizzle
      .select()
      .from(schemas.emailTemplatesEntity)
      .where(eq(schemas.emailTemplatesEntity.type, type));

    return result[0] ?? null;
  }
}
