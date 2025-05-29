import { Injectable } from '@nestjs/common';
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

@Injectable()
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
      { success: true },
      'Starting AWS SQS EmailsEventsSqsConsumer consumer class',
    );

    this.consumer.start();
  }

  public async handleMessage(message: Message): Promise<void> {
    const body = JSON.parse(message.Body) as SNSMessage;

    const eventMessage = JSON.parse(body.Message);

    this.logger.info(
      {
        body: eventMessage,
      },
      'eventMessage.:',
    );

    this.logger.info({ body: eventMessage['topic_name'] }, 'topic_name.:');

    switch (eventMessage['topic_name']) {
      case 'email_password_reset':
        await this.handleEmailPasswordReset(eventMessage);
        break;
      case 'email_order_created':
        await this.handleEmailOrderConfirmed(eventMessage);
        break;
      case 'email_order_status_change':
        await this.handleEmailOrderStatusChange(eventMessage);
        break;
    }

    this.logger.info(
      {
        body: body,
        MessageAttributes: body.MessageAttributes,
        EventMessage: eventMessage,
        TopicName: eventMessage['topic_name'],
      },
      `Received message from SQS queue in class EmailsEventsSqsConsumer`,
    );
  }

  public async handleEmailPasswordReset(
    dto: PasswordRecoveryEmailDto,
  ): Promise<void> {
    this.logger.info(
      {
        body: dto,
      },
      `Received message on topic ${MessagingTopics.EMAIL_PASSWORD_RESET}. Handled by ::handleEmailPasswordReset()`,
    );

    await this.emailsService.sendPasswordResetLink(dto);
  }

  public async handleEmailOrderConfirmed(
    dto: EmailOrderConfirmedDto,
  ): Promise<void> {
    this.logger.info(
      {
        body: dto,
      },
      `Subscribe to message on topic ${MessagingTopics.EMAIL_ORDER_CREATED}`,
    );

    await this.emailsService.sendOrderReceiptEmail(dto);
  }

  public async handleEmailOrderStatusChange(
    dto: OrderStatusChangeDto,
  ): Promise<void> {
    this.logger.info(
      {
        body: dto,
      },
      `Subscribe to message on topic ${MessagingTopics.EMAIL_ORDER_STATUS_CHANGE}`,
    );

    await this.emailsService.sendOrderStatusChangeEmail(dto);
  }
}
