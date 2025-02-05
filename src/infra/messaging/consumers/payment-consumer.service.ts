import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { PaymentsService } from '@/modules/payments/payments.service';
import { MessagingTopics } from '../enum';

@Controller()
export class PaymentMessageConsumer {
  constructor(private readonly paymentsService: PaymentsService) {}

  @EventPattern(MessagingTopics.ORDER_PAYMENT)
  handleOrdersPayment(data: any) {
    console.log(JSON.stringify(data));
  }
}
