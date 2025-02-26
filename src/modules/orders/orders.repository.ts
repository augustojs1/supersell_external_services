import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { ulid } from 'ulid';

import * as schemas from '@/infra/database/orm/drizzle/schema';
import { DATABASE_TAG } from '@/infra/database/orm/drizzle/drizzle.module';
import { OrderStatus } from './enums';
import { OrderPaymentEntity, PaymentData, ProductOrdersResult } from './types';

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

        // Create new order payment record
        await tx.insert(schemas.order_payments).values({
          id,
          order_id: paymentData.order_id,
          status: paymentData.status,
          amount: paymentData.amount,
          code: paymentData.code,
          method: paymentData.method,
        } as OrderPaymentEntity);

        // Set new products sales amount
        const orderProducts: ProductOrdersResult[] = await tx
          .select({
            id: schemas.products.id,
            sales: schemas.products.sales,
          })
          .from(schemas.orders)
          .innerJoin(
            schemas.order_items,
            eq(schemas.orders.id, schemas.order_items.order_id),
          )
          .innerJoin(
            schemas.products,
            eq(schemas.products.id, schemas.order_items.product_id),
          )
          .where(eq(schemas.orders.id, paymentData.order_id));

        orderProducts.forEach(async (product) => {
          await this.drizzle
            .update(schemas.products)
            .set({
              sales: product.sales + 1,
            } as any)
            .where(eq(schemas.products.id, product.id));
        });

        // Set new order status
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
