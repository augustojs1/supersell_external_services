import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { LoggerFactory, JsonLogger } from 'json-logger-service';

import { OrderPaymentsService } from '@/modules/order-payments/order-payments.service';
import { MessagingTopics } from '@/infra/events/enum';
import { IPaymentEventsConsumer } from '@/infra/events/consumers/payment/ipayment-events-consumer.interface';

@Controller()
export class PaymentEventsRabbitMqConsumer implements IPaymentEventsConsumer {
  private readonly logger: JsonLogger = LoggerFactory.createLogger(
    PaymentEventsRabbitMqConsumer.name,
  );

  constructor(private readonly orderPaymentsService: OrderPaymentsService) {}

  @EventPattern(MessagingTopics.ORDER_PAYMENT)
  public async handleOrdersPayment(data: any) {
    this.logger.info({
      message: `Subscribe to message on topic ${MessagingTopics.ORDER_PAYMENT}`,
      body: data,
    });

    await this.orderPaymentsService.create(data);
  }
}
