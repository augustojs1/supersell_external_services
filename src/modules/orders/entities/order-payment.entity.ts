import {
  AnyMySqlColumn,
  char,
  double,
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

import { orders } from '@/infra/database/orm/drizzle/schema';
import { OrderPaymentStatus } from '../enums/order-payment-status.enum';

export const order_payments = mysqlTable('order_payments', {
  id: char({ length: 26 }).primaryKey().notNull(),
  order_id: char({ length: 26 }).references((): AnyMySqlColumn => orders.id),
  amount: double({
    precision: 13,
    scale: 2,
  }).notNull(),
  code: varchar({ length: 100 }),
  status: mysqlEnum(
    'status',
    Object.values(OrderPaymentStatus) as [
      OrderPaymentStatus,
      ...OrderPaymentStatus[],
    ],
  ).notNull(),
  method: varchar({ length: 100 }).notNull(),
  updated_at: timestamp().defaultNow(),
  created_at: timestamp().onUpdateNow(),
});
