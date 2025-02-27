import { Module } from '@nestjs/common';

import { EmailsMessageConsumer, PaymentMessageConsumer } from './consumers';
import { PaymentsModule } from '@/modules/payments/payments.module';
import { EmailsModule } from '@/modules/emails/emails.module';

@Module({
  controllers: [PaymentMessageConsumer, EmailsMessageConsumer],
  imports: [PaymentsModule, EmailsModule],
})
export class MessagingModule {}
