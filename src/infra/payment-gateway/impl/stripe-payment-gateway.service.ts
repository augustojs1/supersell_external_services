import { ulid } from 'ulid';
import { LoggerFactory, JsonLogger } from 'json-logger-service';

import { OrderPaymentDto } from '@/modules/payments/dto/order-payment.dto';
import { IPaymentGateway } from '@/infra/payment-gateway/ipayment-gateway.interface';
import { PaymentGatewayResponse } from '@/infra/payment-gateway/models/payment-gateway-succes.type';

export class StripePaymentGatewayService implements IPaymentGateway {
  private readonly logger: JsonLogger = LoggerFactory.createLogger(
    StripePaymentGatewayService.name,
  );

  constructor() {}

  public async process(data: OrderPaymentDto): Promise<PaymentGatewayResponse> {
    const result = true;

    if (!result) {
      this.logger.info(
        {
          body: data,
        },
        `Payment via Stripe NOT APPROVED`,
      );

      return {
        code: null,
        success: false,
      };
    }

    this.logger.info(
      {
        body: data,
      },
      `Payment via Stripe APPROVED`,
    );

    return {
      code: ulid(),
      success: true,
    };
  }
}
