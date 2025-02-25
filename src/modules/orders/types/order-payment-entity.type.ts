import { OrderPaymentStatus } from '../enums/order-payment-status.enum';

export class OrderPaymentEntity {
  id: string;
  order_id: string;
  amount: number;
  code: string;
  status: OrderPaymentStatus;
  method: string;
  updated_at: string | Date;
  created_at: string | Date;
}
