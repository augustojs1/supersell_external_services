import { Module } from '@nestjs/common';

import { OrderPaymentsService } from './order-payments.service';
import { OrdersModule } from '../orders/orders.module';
import { PaymentGatewayModule } from '@/infra/payment-gateway/payment-gateway.module';

@Module({
  providers: [OrderPaymentsService],
  imports: [OrdersModule, PaymentGatewayModule],
  exports: [OrderPaymentsService],
})
export class OrderPaymentsModule {}
