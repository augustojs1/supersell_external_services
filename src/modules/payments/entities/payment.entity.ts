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
import { PaymentStatus } from '../enums';

export const orderPayments = mysqlTable('order_payments', {
  id: char({ length: 26 }).primaryKey().notNull(),
  order_id: char({ length: 26 }).references((): AnyMySqlColumn => orders.id),
  amount: double({ precision: 13, scale: 2 }).notNull(),
  code: varchar({ length: 100 }).notNull(),
  method: varchar({ length: 100 }).notNull(),
  status: mysqlEnum(
    'status',
    Object.values(PaymentStatus) as [PaymentStatus, ...PaymentStatus[]],
  ).notNull(),
  updated_at: timestamp().onUpdateNow(),
  created_at: timestamp().defaultNow(),
});
