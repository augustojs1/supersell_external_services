import { JsonLogger, LoggerFactory } from 'json-logger-service';

import { PaymentsService } from '@/modules/payments/payments.service';
import { MessagingTopics } from '@/infra/events/enum';
import { IPaymentEventsConsumer } from '@/infra/events/consumers/payment/ipayment-events-consumer.interface';

export class PaymentEventsSqsConsumer implements IPaymentEventsConsumer {
  private readonly logger: JsonLogger = LoggerFactory.createLogger(
    PaymentEventsSqsConsumer.name,
  );

  constructor(private readonly paymentsService: PaymentsService) {}

  handleOrdersPayment(data: any): Promise<void> {
    this.logger.info({
      message: `Subscribe to message on topic ${MessagingTopics.ORDER_PAYMENT}`,
      body: data,
    });

    return;
  }
}
