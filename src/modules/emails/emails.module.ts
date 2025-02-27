import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { EmailsService } from './emails.service';
import { configuration } from '@/infra/config/configuration';

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
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
