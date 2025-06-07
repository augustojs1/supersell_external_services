import { Injectable } from '@nestjs/common';
import { LoggerFactory, JsonLogger } from 'json-logger-service';

import { OrdersService } from '../orders/orders.service';
import { PaymentMessageDto } from '@/infra/events/consumers/payment/dto';
import { EmailsService } from '../emails/emails.service';
import { MessagingTopics } from '@/infra/events/enum';
import { OrderStatus } from '../orders/enums';

@Injectable()
export class OrderPaymentsService {
  private readonly logger: JsonLogger = LoggerFactory.createLogger(
    OrderPaymentsService.name,
  );

  constructor(
    private readonly ordersService: OrdersService,
    private readonly emailsService: EmailsService,
  ) {}

  public async create(data: PaymentMessageDto): Promise<void> {
    const orderCustomer =
      await this.ordersService.findOrderCustomerByIdElseThrow(data.order_id);

    this.logger.info(
      {
        body: orderCustomer,
      },
      `Found order #${data.order_id}.`,
    );

    try {
      await this.ordersService.updateOrderStatus(orderCustomer.order);

      this.logger.info(
        {
          body: data,
        },
        `SUCCESS updated order payment for order #${orderCustomer.order.id}.`,
      );

      await this.emailsService.sendOrderStatusChangeEmail({
        topic_name: MessagingTopics.EMAIL_ORDER_STATUS_CHANGE,
        order_id: orderCustomer.order.id,
        status: OrderStatus.PAID,
        customer_id: orderCustomer.order.customer_id,
        customer_name: orderCustomer.customer.first_name,
        customer_email: orderCustomer.customer.email,
        seller_id: orderCustomer.order.seller_id,
      });
    } catch (error) {
      this.logger.error(
        {
          body: orderCustomer,
          error: error,
        },
        `FAILED updated payment status flow for order #${orderCustomer.order.id}.`,
      );
    }
  }
}
