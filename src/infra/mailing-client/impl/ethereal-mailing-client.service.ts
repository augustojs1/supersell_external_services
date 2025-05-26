import { MailerService } from '@nestjs-modules/mailer';
import { LoggerFactory, JsonLogger } from 'json-logger-service';

import { MailingPayloadModel } from '@/infra/mailing-client/models';
import { IMailingClientService } from '@/infra/mailing-client/imailing-client-service.interface';

export class EtherealMailingClientService implements IMailingClientService {
  private readonly logger: JsonLogger = LoggerFactory.createLogger(
    EtherealMailingClientService.name,
  );

  constructor(private readonly mailerService: MailerService) {}

  public async send(payload: MailingPayloadModel): Promise<void> {
    await this.mailerService.sendMail(payload);

    this.logger.info(
      {
        body: payload,
      },
      `Email sent to ${payload.to} via Ethereal mailing client.`,
    );
  }
}
