import { Module } from '@nestjs/common';

import { OrderPaymentsService } from './order-payments.service';
import { OrdersModule } from '../orders/orders.module';
import { EmailsModule } from '../emails/emails.module';

@Module({
  providers: [OrderPaymentsService],
  imports: [OrdersModule, EmailsModule],
  exports: [OrderPaymentsService],
})
export class OrderPaymentsModule {}
