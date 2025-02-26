import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from '@/infra/config/configuration';
import { PaymentsModule } from './modules/payments/payments.module';
import { OrdersModule } from './modules/orders/orders.module';
import { DrizzleModule } from './infra/database/orm/drizzle/drizzle.module';
import { MessagingModule } from './infra/messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/infra/config/env/development.env`,
      isGlobal: true,
      load: [configuration],
    }),
    PaymentsModule,
    OrdersModule,
    DrizzleModule,
    MessagingModule,
  ],
})
export class AppModule {}
