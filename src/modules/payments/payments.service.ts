import { Injectable } from '@nestjs/common';
import { LoggerFactory, JsonLogger } from 'json-logger-service';

import { OrderPaymentDto } from './dto/order-payment.dto';
import { OrdersService } from '../orders/orders.service';
import { OrderStatus } from '../orders/enums';
import { OrderPaymentStatus } from '../orders/enums/order-payment-status.enum';
import { IPaymentGateway } from '@/infra/payment-gateway/ipayment-gateway.interface';

@Injectable()
export class PaymentsService {
  private readonly logger: JsonLogger = LoggerFactory.createLogger(
    PaymentsService.name,
  );

  constructor(
    private readonly ordersService: OrdersService,
    private readonly paymentGatewayService: IPaymentGateway,
  ) {}

  public async create(data): Promise<void> {
    const payload: OrderPaymentDto = data;

    try {
      const paymentResult = await this.paymentGatewayService.process(payload);

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

      this.logger.info(
        {
          body: payload,
        },
        `SUCCESS payment for order #${payload.order.id}.`,
      );
    } catch (error) {
      this.logger.error(
        {
          body: payload,
          error: error,
        },
        `FAILED payment for order #${payload.order.id}.`,
      );
    }
  }
}
