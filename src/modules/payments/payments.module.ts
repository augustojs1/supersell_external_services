import { Module } from '@nestjs/common';

import { PaymentsService } from './payments.service';
import { OrdersModule } from '../orders/orders.module';
import { PaymentGatewayModule } from '@/infra/payment-gateway/payment-gateway.module';

@Module({
  providers: [PaymentsService],
  imports: [OrdersModule, PaymentGatewayModule],
  exports: [PaymentsService],
})
export class PaymentsModule {}
