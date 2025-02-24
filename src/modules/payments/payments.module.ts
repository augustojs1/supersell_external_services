import { Module } from '@nestjs/common';

import { PaymentsService } from './payments.service';
import { PaymentMessageConsumer } from '@/infra/messaging/consumers/payment-consumer.service';
import { MockPaymentGatewayService } from '@/infra/payment-gateway/impl';

@Module({
  controllers: [PaymentMessageConsumer],
  providers: [PaymentsService, MockPaymentGatewayService],
})
export class PaymentsModule {}
