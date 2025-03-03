import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { PaymentsService } from '@/modules/payments/payments.service';
import { MessagingTopics } from '../enum';

@Controller()
export class PaymentMessageConsumer {
  private readonly logger = new Logger(PaymentMessageConsumer.name);

  constructor(private readonly paymentsService: PaymentsService) {}

  @EventPattern(MessagingTopics.ORDER_PAYMENT)
  public async handleOrdersPayment(data) {
    this.logger.log(
      `Subscribe to message on topic ${MessagingTopics.ORDER_PAYMENT}`,
    );
    await this.paymentsService.create(data);
  }
}
