import { JsonLogger, LoggerFactory } from 'json-logger-service';

import { MessagingTopics } from '@/infra/events/enum';
import { IEmailsEventsConsumer } from '@/infra/events/consumers/emails/iemails-consumer.interface';
import {
  EmailOrderConfirmedDto,
  OrderStatusChangeDto,
  PasswordRecoveryEmailDto,
} from '@/infra/events/consumers/emails/dto';
import { EmailsService } from '@/modules/emails/emails.service';

export class EmailsEventsSqsConsumer implements IEmailsEventsConsumer {
  private readonly logger: JsonLogger = LoggerFactory.createLogger(
    EmailsEventsSqsConsumer.name,
  );

  constructor(private readonly emailsService: EmailsService) {}

  handleEmailOrderConfirmed(dto: EmailOrderConfirmedDto): Promise<void> {
    this.logger.info(
      {
        body: dto,
      },
      `Subscribe to message on topic ${MessagingTopics.EMAIL_PASSWORD_RESET}`,
    );

    return;
  }

  handleEmailOrderStatusChange(dto: OrderStatusChangeDto): Promise<void> {
    this.logger.info(
      {
        body: dto,
      },
      `Subscribe to message on topic ${MessagingTopics.EMAIL_ORDER_STATUS_CHANGE}`,
    );

    return;
  }

  handleEmailPasswordReset(dto: PasswordRecoveryEmailDto): Promise<void> {
    this.logger.info(
      {
        body: dto,
      },
      `Subscribe to message on topic ${MessagingTopics.EMAIL_ORDER_CREATED}`,
    );

    return;
  }
}
