import { OrderPaymentStatus } from '../enums/order-payment-status.enum';

export class PaymentData {
  order_id: string;
  code: string;
  amount: number;
  method: string;
  status: OrderPaymentStatus;
}
