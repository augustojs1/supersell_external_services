import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JsonLogger, LoggerFactory } from 'json-logger-service';

import { MessagingTopics } from '@/infra/events/enum';
import { EmailsService } from '@/modules/emails/emails.service';
import {
  EmailOrderConfirmedDto,
  OrderStatusChangeDto,
  PasswordRecoveryEmailDto,
} from '@/infra/events/consumers/emails/dto';
import { IEmailsEventsConsumer } from '@/infra/events/consumers/emails/iemails-consumer.interface';

@Controller()
export class EmailsEventsRabbitMqConsumer implements IEmailsEventsConsumer {
  private readonly logger: JsonLogger = LoggerFactory.createLogger(
    EmailsEventsRabbitMqConsumer.name,
  );

  constructor(private readonly emailsService: EmailsService) {}

  @MessagePattern(MessagingTopics.EMAIL_PASSWORD_RESET)
  public async handleEmailPasswordReset(
    @Payload() dto: PasswordRecoveryEmailDto,
  ): Promise<void> {
    this.logger.info(
      `Subscribe to message on topic ${MessagingTopics.EMAIL_PASSWORD_RESET}`,
    );

    await this.emailsService.sendPasswordResetLink(dto);
  }

  @MessagePattern(MessagingTopics.EMAIL_ORDER_STATUS_CHANGE)
  public async handleEmailOrderStatusChange(
    @Payload() dto: OrderStatusChangeDto,
  ): Promise<void> {
    this.logger.info(
      `Subscribe to message on topic ${MessagingTopics.EMAIL_ORDER_STATUS_CHANGE}`,
    );

    await this.emailsService.sendOrderStatusChangeEmail(dto);
  }

  @MessagePattern(MessagingTopics.EMAIL_ORDER_CREATED)
  public async handleEmailOrderConfirmed(
    @Payload() dto: EmailOrderConfirmedDto,
  ): Promise<void> {
    this.logger.info(
      `Subscribe to message on topic ${MessagingTopics.EMAIL_ORDER_CREATED}`,
    );

    await this.emailsService.sendOrderReceiptEmail(dto);
  }
}
