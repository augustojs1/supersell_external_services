import { Message } from '@aws-sdk/client-sqs';
import { SNSMessage } from 'aws-lambda';
import { Consumer } from 'sqs-consumer';
import { JsonLogger, LoggerFactory } from 'json-logger-service';

import { MessagingTopics } from '@/infra/events/enum';
import { IEmailsEventsConsumer } from '@/infra/events/consumers/emails/iemails-consumer.interface';
import {
  EmailOrderConfirmedDto,
  OrderStatusChangeDto,
  PasswordRecoveryEmailDto,
} from '@/infra/events/consumers/emails/dto';
import { EmailsService } from '@/modules/emails/emails.service';

export class EmailsEventsSqsConsumer implements IEmailsEventsConsumer {
  private readonly logger: JsonLogger = LoggerFactory.createLogger(
    EmailsEventsSqsConsumer.name,
  );
  private readonly consumer: Consumer;

  constructor(private readonly emailsService: EmailsService) {
    this.consumer = Consumer.create({
      queueUrl: process.env.AWS_SQS_QUEUE_EMAIL_EVENTS_URL,
      waitTimeSeconds: 5,
      pollingWaitTimeMs: 0,
      handleMessage: async (message) => this.handleMessage(message),
    });

    this.logger.info(
      {},
      'Starting AWS SQS EmailsEventsSqsConsumer consumer class',
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

  handleEmailOrderConfirmed(dto: EmailOrderConfirmedDto): Promise<void> {
    this.logger.info(
      {
        body: dto,
      },
      `Subscribe to message on topic ${MessagingTopics.EMAIL_PASSWORD_RESET}`,
    );

    return;
  }

  handleEmailOrderStatusChange(dto: OrderStatusChangeDto): Promise<void> {
    this.logger.info(
      {
        body: dto,
      },
      `Subscribe to message on topic ${MessagingTopics.EMAIL_ORDER_STATUS_CHANGE}`,
    );

    return;
  }

  handleEmailPasswordReset(dto: PasswordRecoveryEmailDto): Promise<void> {
    this.logger.info(
      {
        body: dto,
      },
      `Subscribe to message on topic ${MessagingTopics.EMAIL_ORDER_CREATED}`,
    );

    return;
  }
}
