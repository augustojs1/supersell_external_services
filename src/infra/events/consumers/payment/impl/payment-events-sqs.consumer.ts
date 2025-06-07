import { Injectable } from '@nestjs/common';
import { Message } from '@aws-sdk/client-sqs';
import { SNSMessage } from 'aws-lambda';
import { Consumer } from 'sqs-consumer';
import { JsonLogger, LoggerFactory } from 'json-logger-service';

import { OrderPaymentsService } from '@/modules/order-payments/order-payments.service';
import { IPaymentEventsConsumer } from '@/infra/events/consumers/payment/ipayment-events-consumer.interface';
import { PaymentMessageDto } from '../dto';

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
      handleMessage: async (message) => this.handleOrdersPayment(message),
    });

    this.logger.info(
      {
        success: true,
      },
      'Starting AWS SQS PaymentEventsSqsConsumer consumer class',
    );

    this.consumer.start();
  }

  public async handleOrdersPayment(message: Message): Promise<void> {
    const body = JSON.parse(message.Body) as SNSMessage;

    const eventMessage = JSON.parse(body.Message) as PaymentMessageDto;

    this.logger.info(
      {
        body: body,
        MessageAttributes: body.MessageAttributes,
        eventMessage,
      },
      `Received message from SQS queue in class PaymentEventsSqsConsumer`,
    );

    await this.orderPaymentsService.create(eventMessage);
  }
}
