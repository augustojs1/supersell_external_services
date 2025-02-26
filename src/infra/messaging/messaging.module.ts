import { Module } from '@nestjs/common';

import { EmailsMessageConsumer, PaymentMessageConsumer } from './consumers';
import { PaymentsModule } from '@/modules/payments/payments.module';

@Module({
  controllers: [PaymentMessageConsumer, EmailsMessageConsumer],
  imports: [PaymentsModule],
})
export class MessagingModule {}
