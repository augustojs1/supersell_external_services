import { Injectable } from '@nestjs/common';

import { OrderPaymentDto } from './dto/order-payment.dto';
import { MockPaymentGatewayService } from '@/infra/payment-gateway/impl';
import { OrdersService } from '../orders/orders.service';
import { OrderStatus } from '../orders/enums';
import { OrderPaymentStatus } from '../orders/enums/order-payment-status.enum';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly mockPaymentGateway: MockPaymentGatewayService,
  ) {}

  public async create(data) {
    const payload: OrderPaymentDto = data;

    const paymentResult = await this.mockPaymentGateway.send(payload);

    await this.ordersService.updateOrderStatus(
      paymentResult.success ? OrderStatus.PAID : OrderStatus.FAILED_PAYMENT,
      {
        order_id: payload.order.id,
        amount: payload.order.total_price,
        code: paymentResult.code,
        method: payload.method,
        status: paymentResult.success
          ? OrderPaymentStatus.SUCCESS
          : OrderPaymentStatus.FAIL,
      },
    );
  }
}
