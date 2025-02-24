import { OrderPaymentDto } from '@/modules/payments/dto/order-payment.dto';

export interface PaymentGateway {
  send(data: OrderPaymentDto): boolean;
}
