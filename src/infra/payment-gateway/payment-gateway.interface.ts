import { OrderPaymentDto } from '@/modules/payments/dto/order-payment.dto';
import { PaymentGatewayResponse } from './types/payment-gateway-succes.type';

export interface PaymentGateway {
  send(data: OrderPaymentDto): Promise<PaymentGatewayResponse>;
}
