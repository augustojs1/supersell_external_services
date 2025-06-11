import { Module } from '@nestjs/common';

import { configuration } from '@/infra/config/configuration';
import { IEmailsEventsConsumer } from '@/infra/events/consumers/emails/iemails-consumer.interface';
import { OrderPaymentsModule } from '@/modules/order-payments/order-payments.module';
import { EmailsModule } from '@/modules/emails/emails.module';
import {
  EmailsEventsRabbitMqConsumer,
  EmailsEventsSqsConsumer,
} from '@/infra/events/consumers/emails/impl';
import { PaymentEventsRabbitMqConsumer } from '@/infra/events/consumers/payment/impl/payment-events-rabbitmq.consumer';
import { IPaymentEventsConsumer } from '@/infra/events/consumers/payment/ipayment-events-consumer.interface';
import { PaymentEventsSqsConsumer } from '@/infra/events/consumers/payment/impl/payment-events-sqs.consumer';

@Module({
  controllers: [PaymentEventsRabbitMqConsumer, EmailsEventsRabbitMqConsumer],
  imports: [OrderPaymentsModule, EmailsModule],
  providers: [
    {
      provide: IEmailsEventsConsumer,
      useClass:
        configuration().NODE_ENV === 'development'
          ? EmailsEventsRabbitMqConsumer
          : EmailsEventsSqsConsumer,
    },
    {
      provide: IPaymentEventsConsumer,
      useClass:
        configuration().NODE_ENV === 'development'
          ? PaymentEventsRabbitMqConsumer
          : PaymentEventsSqsConsumer,
    },
  ],
})
export class EventsModule {}
