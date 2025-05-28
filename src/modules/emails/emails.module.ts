import { Module } from '@nestjs/common';

import { EmailsService } from './emails.service';
import { MailingClientModule } from '@/infra/mailing-client/mailing-client.module';
import { TemplateEngineModule } from '@/infra/template-engine/template-engine.module';

@Module({
  imports: [MailingClientModule, TemplateEngineModule],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
