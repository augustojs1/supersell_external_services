import { Module } from '@nestjs/common';

import { EmailsService } from './emails.service';
import { ITemplateEngineService } from '@/infra/template-engine/itemplate-engine-service.interface';
import { EjsTemplateEngineService } from '@/infra/template-engine/impl';
import { MailingClientModule } from '@/infra/mailing-client/mailing-client.module';

@Module({
  imports: [MailingClientModule],
  providers: [
    EmailsService,
    {
      provide: ITemplateEngineService,
      useClass: EjsTemplateEngineService,
    },
  ],
  exports: [EmailsService],
})
export class EmailsModule {}
