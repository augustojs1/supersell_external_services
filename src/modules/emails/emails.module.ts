import { Module } from '@nestjs/common';

import { EmailsService } from './emails.service';
import { MailingClientModule } from '@/infra/mailing-client/mailing-client.module';
import { TemplateEngineModule } from '@/infra/template-engine/template-engine.module';
import { EmailTemplatesRepository } from './email-templates.repository';

@Module({
  imports: [MailingClientModule, TemplateEngineModule],
  providers: [EmailsService, EmailTemplatesRepository],
  exports: [EmailsService],
})
export class EmailsModule {}
