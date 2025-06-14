import { Module } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { EmailsModule } from '../emails/emails.module';

@Module({
  imports: [EmailsModule],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
