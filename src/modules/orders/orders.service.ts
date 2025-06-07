import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoggerFactory, JsonLogger } from 'json-logger-service';
import { ulid } from 'ulid';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';

import { OrdersRepository } from './orders.repository';
import { OrderEntity, OrderPaymentEntity, ProductOrdersResult } from './types';
import * as schemas from '@/infra/database/orm/drizzle/schema';
import { OrderPaymentStatus } from './enums/order-payment-status.enum';
import { OrderStatus } from './enums';
import { OrderCustomer } from './types/order-customer.type';

@Injectable()
export class OrdersService {
  private readonly logger: JsonLogger = LoggerFactory.createLogger(
    OrdersService.name,
  );

  constructor(
    @Inject('DB_DEV')
    private readonly drizzle: MySql2Database,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  public async findOrderCustomerByIdElseThrow(
    order_id: string,
  ): Promise<OrderCustomer> {
    const order =
      await this.ordersRepository.findOrderAndCustomerById(order_id);

    if (!order) {
      throw new HttpException(
        'Order with this id not found!',
        HttpStatus.NOT_FOUND,
      );
    }

    return order;
  }

  public async updateOrderStatus(order: OrderEntity) {
    this.logger.info(`Received order #${order.id} to update payment status`);

    await this.drizzle.transaction(async (tx) => {
      try {
        const id = ulid();

        await tx.insert(schemas.order_payments).values({
          id,
          order_id: order.id,
          status: OrderPaymentStatus.SUCCESS,
          amount: order.total_price,
          code: ulid(),
          method: 'credit',
        } as OrderPaymentEntity);

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
          .where(eq(schemas.orders.id, order.id));

        orderProducts.forEach(async (product) => {
          await this.drizzle
            .update(schemas.products)
            .set({
              sales: product.sales + 1,
            } as any)
            .where(eq(schemas.products.id, product.id));
        });

        await tx
          .update(schemas.orders)
          .set({
            status: OrderStatus.PAID,
          })
          .where(eq(schemas.orders.id, order.id));
      } catch (error) {
        throw error;
      }
    });
  }
}
