import { OrderPaymentDto } from '@/modules/payments/dto/order-payment.dto';
import { PaymentGateway } from '../payment-gateway.interface';

export class MockPaymentGatewayService implements PaymentGateway {
  send(data: OrderPaymentDto): boolean {
    return false;
  }
}
