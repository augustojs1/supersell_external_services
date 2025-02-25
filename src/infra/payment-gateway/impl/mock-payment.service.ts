import { ulid } from 'ulid';

import { OrderPaymentDto } from '@/modules/payments/dto/order-payment.dto';
import { PaymentGateway } from '../payment-gateway.interface';
import { PaymentGatewayResponse } from '../types/payment-gateway-succes.type';

export class MockPaymentGatewayService implements PaymentGateway {
  public async send(data: OrderPaymentDto): Promise<PaymentGatewayResponse> {
    const result = true;

    if (!result) {
      return {
        code: null,
        success: false,
      };
    }

    return {
      code: ulid(),
      success: true,
    };
  }
}
