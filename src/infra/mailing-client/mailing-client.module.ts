import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { configuration } from '@/infra/config/configuration';
import { IMailingClientService } from '@/infra/mailing-client/imailing-client-service.interface';
import { EtherealMailingClientService } from '@/infra/mailing-client/impl/ethereal-mailing-client.service';
import { SesMailingClientService } from '@/infra/mailing-client/impl/ses-mailing-client.service';

const env = configuration();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: env.ethereal_smtp.host,
        port: env.ethereal_smtp.port,
        secure: false,
        auth: {
          user: env.ethereal_smtp.user,
          pass: env.ethereal_smtp.pass,
        },
      },
    }),
  ],
  providers: [
    {
      provide: IMailingClientService,
      useClass:
        env.NODE_ENV === 'development'
          ? EtherealMailingClientService
          : SesMailingClientService,
    },
  ],
  exports: [IMailingClientService],
})
export class MailingClientModule {}
