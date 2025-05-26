import { Module } from '@nestjs/common';

import { configuration } from '@/infra/config/configuration';
import { IPaymentGateway } from '@/infra/payment-gateway/ipayment-gateway.interface';
import {
  MockPaymentGatewayService,
  StripePaymentGatewayService,
} from '@/infra/payment-gateway/impl';

const env = configuration();

@Module({
  providers: [
    {
      provide: IPaymentGateway,
      useClass:
        env.NODE_ENV === 'development'
          ? MockPaymentGatewayService
          : StripePaymentGatewayService,
    },
  ],
  exports: [IPaymentGateway],
})
export class PaymentGatewayModule {}
