import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';

import * as schemas from '@/infra/database/orm/drizzle/schema';
import { OrderEntity } from './types';
import { OrderCustomer } from './types/order-customer.type';

@Injectable()
export class OrdersRepository {
  constructor(
    @Inject('DB_DEV')
    private readonly drizzle: MySql2Database,
  ) {}

  public async findById(id: string): Promise<OrderEntity | null> {
    const result = await this.drizzle
      .select()
      .from(schemas.orders)
      .where(eq(schemas.orders.id, id));

    return result[0] ?? null;
  }

  public async findOrderAndCustomerById(
    order_id: string,
  ): Promise<OrderCustomer> {
    // SELECT
    // 	o.id as order_id,
    // 	o.status as status,
    // 	o.customer_id as customer_id,
    // 	u.username as customer_name,
    // 	o.seller_id as seller_id
    // FROM
    // 	orders o
    // INNER JOIN
    // 	users u
    // ON
    // 	o.customer_id = u.id
    // WHERE
    // 	o.id = '';
    const queryResult = await this.drizzle
      .select({
        customer: {
          first_name: schemas.users.first_name,
          email: schemas.users.email,
        },
        order: {
          id: schemas.orders.id,
          customer_id: schemas.orders.customer_id,
          seller_id: schemas.orders.seller_id,
          delivery_address_id: schemas.orders.delivery_address_id,
          status: schemas.orders.status,
          total_price: schemas.orders.total_price,
          updated_at: schemas.orders.updated_at,
          created_at: schemas.orders.created_at,
        },
      })
      .from(schemas.orders)
      .innerJoin(
        schemas.users,
        eq(schemas.orders.customer_id, schemas.users.id),
      )
      .where(eq(schemas.orders.id, order_id));

    return queryResult[0] ?? null;
  }
}
