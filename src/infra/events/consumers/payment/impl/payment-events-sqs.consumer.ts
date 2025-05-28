import { Injectable } from '@nestjs/common';
import { Message } from '@aws-sdk/client-sqs';
import { SNSMessage } from 'aws-lambda';
import { Consumer } from 'sqs-consumer';
import { JsonLogger, LoggerFactory } from 'json-logger-service';

import { OrderPaymentsService } from '@/modules/order-payments/order-payments.service';
import { MessagingTopics } from '@/infra/events/enum';
import { IPaymentEventsConsumer } from '@/infra/events/consumers/payment/ipayment-events-consumer.interface';

@Injectable()
export class PaymentEventsSqsConsumer implements IPaymentEventsConsumer {
  private readonly logger: JsonLogger = LoggerFactory.createLogger(
    PaymentEventsSqsConsumer.name,
  );
  private readonly consumer: Consumer;

  constructor(private readonly orderPaymentsService: OrderPaymentsService) {
    this.consumer = Consumer.create({
      queueUrl: process.env.AWS_SQS_QUEUE_PAYMENT_EVENTS_URL,
      waitTimeSeconds: 5,
      pollingWaitTimeMs: 0,
      handleMessage: async (message) => this.handleMessage(message),
    });
    this.logger.info(
      {
        success: true,
      },
      'Starting AWS SQS PaymentEventsSqsConsumer consumer class',
    );
    this.consumer.start();
  }

  async handleMessage(message: Message): Promise<void> {
    const body = JSON.parse(message.Body) as SNSMessage;

    this.logger.info(
      {
        body: body,
        MessageAttributes: body.MessageAttributes,
      },
      `Received message from SQS queue in class EmailsEventsSqsConsumer`,
    );
  }

  handleOrdersPayment(data: any): Promise<void> {
    this.logger.info({
      message: `Subscribe to message on topic ${MessagingTopics.ORDER_PAYMENT}`,
      body: data,
    });

    return;
  }
}
