import { Module } from '@nestjs/common';

import { PaymentsService } from './payments.service';
import { MockPaymentGatewayService } from '@/infra/payment-gateway/impl';
import { OrdersModule } from '../orders/orders.module';

@Module({
  providers: [PaymentsService, MockPaymentGatewayService],
  imports: [OrdersModule],
  exports: [PaymentsService],
})
export class PaymentsModule {}
