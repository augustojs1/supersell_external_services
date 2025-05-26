import { LoggerFactory, JsonLogger } from 'json-logger-service';

import { MailingPayloadModel } from '@/infra/mailing-client/models';
import { IMailingClientService } from '@/infra/mailing-client/imailing-client-service.interface';

export class SesMailingClientService implements IMailingClientService {
  private readonly logger: JsonLogger = LoggerFactory.createLogger(
    SesMailingClientService.name,
  );

  constructor() {}

  public async send(payload: MailingPayloadModel): Promise<void> {
    this.logger.info(
      {
        body: payload,
      },
      `Email sent to ${payload.to} via AWS SES mailing client.`,
    );

    return;
  }
}
