import { OrderPaymentDto } from '@/modules/order-payments/dto/order-payment.dto';
import { PaymentGatewayResponse } from './models/payment-gateway-succes.type';

export abstract class IPaymentGateway {
  abstract process(data: OrderPaymentDto): Promise<PaymentGatewayResponse>;
}
