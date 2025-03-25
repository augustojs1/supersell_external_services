import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { MessagingTopics } from '../enum';
import { EmailsService } from '@/modules/emails/emails.service';
import {
  EmailOrderConfirmedDto,
  OrderStatusChangeDto,
  PasswordRecoveryEmailDto,
} from './dto';

@Controller()
export class EmailsMessageConsumer {
  private readonly logger = new Logger(EmailsMessageConsumer.name);

  constructor(private readonly emailsService: EmailsService) {}

  @MessagePattern(MessagingTopics.EMAIL_PASSWORD_RESET)
  public async handleEmailPasswordReset(
    @Payload() dto: PasswordRecoveryEmailDto,
  ) {
    this.logger.log(
      `Subscribe to message on topic ${MessagingTopics.EMAIL_PASSWORD_RESET}`,
    );
    await this.emailsService.sendPasswordResetLink(dto);
  }

  @MessagePattern(MessagingTopics.EMAIL_ORDER_STATUS_CHANGE)
  public async handleEmailOrderStatusChange(
    @Payload() dto: OrderStatusChangeDto,
  ) {
    this.logger.log(
      `Subscribe to message on topic ${MessagingTopics.EMAIL_ORDER_STATUS_CHANGE}`,
    );
    await this.emailsService.sendOrderStatusChangeEmail(dto);
  }

  @MessagePattern(MessagingTopics.EMAIL_ORDER_CREATED)
  public async handleEmailOrderConfirmed(
    @Payload() dto: EmailOrderConfirmedDto,
  ) {
    this.logger.log(
      `Subscribe to message on topic ${MessagingTopics.EMAIL_ORDER_CREATED}`,
    );
    await this.emailsService.sendOrderReceiptEmail(dto);
  }
}
