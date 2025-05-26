import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from '@/infra/config/configuration';
import { OrderPaymentsModule } from './modules/order-payments/order-payments.module';
import { OrdersModule } from './modules/orders/orders.module';
import { DrizzleModule } from './infra/database/orm/drizzle/drizzle.module';
import { EventsModule } from './infra/events/events.module';
import { EmailsModule } from './modules/emails/emails.module';
import { MailingClientModule } from './infra/mailing-client/mailing-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/infra/config/env/development.env`,
      isGlobal: true,
      load: [configuration],
    }),
    OrderPaymentsModule,
    OrdersModule,
    DrizzleModule,
    EventsModule,
    MailingClientModule,
    EmailsModule,
  ],
})
export class AppModule {}
