import { Module } from '@nestjs/common';

import { PaymentsService } from './payments.service';
import { PaymentMessageConsumer } from '@/infra/messaging/consumers/payment-consumer.service';

@Module({
  controllers: [PaymentMessageConsumer],
  providers: [PaymentsService],
})
export class PaymentsModule {}
