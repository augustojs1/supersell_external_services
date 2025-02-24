import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { PaymentsService } from '@/modules/payments/payments.service';
import { MessagingTopics } from '../enum';
import { OrderPaymentDto } from '@/modules/payments/dto/order-payment.dto';

@Controller()
export class PaymentMessageConsumer {
  constructor(private readonly paymentsService: PaymentsService) {}

  @EventPattern(MessagingTopics.ORDER_PAYMENT)
  public async handleOrdersPayment(data: OrderPaymentDto) {
    await this.paymentsService.create(data);
  }
}
