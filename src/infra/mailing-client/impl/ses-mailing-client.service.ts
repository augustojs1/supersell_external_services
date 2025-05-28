import { Injectable } from '@nestjs/common';
import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandInput,
} from '@aws-sdk/client-ses';
import { LoggerFactory, JsonLogger } from 'json-logger-service';

import { configuration } from '@/infra/config/configuration';
import { MailingPayloadModel } from '@/infra/mailing-client/models';
import { IMailingClientService } from '@/infra/mailing-client/imailing-client-service.interface';

@Injectable()
export class SesMailingClientService implements IMailingClientService {
  private readonly logger: JsonLogger = LoggerFactory.createLogger(
    SesMailingClientService.name,
  );
  private readonly sesClient: SESClient;
  private readonly env = configuration();

  constructor() {
    this.sesClient = new SESClient({
      credentials: {
        accessKeyId: this.env.aws.access_key,
        secretAccessKey: this.env.aws.secret_access_key,
      },
      region: this.env.aws.region,
    });
  }

  public async send(payload: MailingPayloadModel): Promise<void> {
    const params: SendEmailCommandInput = {
      Destination: {
        ToAddresses: [payload.to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: payload.html,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: payload.subject,
        },
      },
      Source: payload.from,
    };

    try {
      const response = await this.sesClient.send(new SendEmailCommand(params));

      this.logger.info(
        { response },
        `Email sent to ${payload.to} via AWS SES.`,
      );
    } catch (error) {
      this.logger.error({ error }, 'Failed to send email via SES');
      throw error;
    }
  }
}
