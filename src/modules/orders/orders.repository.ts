import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { ulid } from 'ulid';

import * as schemas from '@/infra/database/orm/drizzle/schema';
import { DATABASE_TAG } from '@/infra/database/orm/drizzle/drizzle.module';
import { OrderStatus } from './enums';
import { OrderPaymentEntity, PaymentData } from './types';

@Injectable()
export class OrdersRepository {
  constructor(
    @Inject(DATABASE_TAG)
    private readonly drizzle: MySql2Database,
  ) {}

  public async createOrderPaymentAndSetOrderStatusTrx(
    orderStatus: OrderStatus,
    paymentData: PaymentData,
  ): Promise<void> {
    await this.drizzle.transaction(async (tx) => {
      try {
        const id = ulid();

        await tx.insert(schemas.order_payments).values({
          id,
          order_id: paymentData.order_id,
          status: paymentData.status,
          amount: paymentData.amount,
          code: paymentData.code,
          method: paymentData.method,
        } as OrderPaymentEntity);

        await tx
          .update(schemas.orders)
          .set({
            status: orderStatus,
          })
          .where(eq(schemas.orders.id, paymentData.order_id));
      } catch (error) {
        throw error;
      }
    });
  }
}
