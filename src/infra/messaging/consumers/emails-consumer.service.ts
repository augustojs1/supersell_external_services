import { Body, Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { MessagingTopics } from '../enum';
import { EmailsService } from '@/modules/emails/emails.service';
import { OrderStatusChangeDto, PasswordRecoveryEmailDto } from './dto';

@Controller()
export class EmailsMessageConsumer {
  constructor(private readonly emailsService: EmailsService) {}

  @EventPattern(MessagingTopics.EMAIL_PASSWORD_RESET)
  public async handleEmailPasswordReset(@Body() dto: PasswordRecoveryEmailDto) {
    await this.emailsService.sendPasswordResetLink(dto);
  }

  @EventPattern(MessagingTopics.EMAIL_ORDER_STATUS_CHANGE)
  public async handleEmailOrderStatusChange(@Body() dto: OrderStatusChangeDto) {
    await this.emailsService.sendOrderStatusChangeEmail(dto);
  }
}
