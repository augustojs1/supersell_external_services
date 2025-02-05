import {
  AnyMySqlColumn,
  char,
  double,
  mysqlEnum,
  mysqlTable,
  timestamp,
} from 'drizzle-orm/mysql-core';

import { users as userEntity } from './user.entity';
import { address as addressEntity } from './address.entity';

enum OrderStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  FAILED_PAYMENT = 'FAILED_PAYMENT',
  PAID = 'PAID',
  SENT = 'SENT',
  ON_DELIVERY = 'ON_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export const orders = mysqlTable('orders', {
  id: char({ length: 26 }).primaryKey().notNull(),
  customer_id: char({ length: 26 }).references(
    (): AnyMySqlColumn => userEntity.id,
  ),
  seller_id: char({ length: 26 }).references(
    (): AnyMySqlColumn => userEntity.id,
  ),
  delivery_address_id: char({ length: 26 }).references(
    (): AnyMySqlColumn => addressEntity.id,
  ),
  status: mysqlEnum(
    'status',
    Object.values(OrderStatus) as [OrderStatus, ...OrderStatus[]],
  ).notNull(),
  total_price: double({ precision: 13, scale: 2 }).notNull(),
  updated_at: timestamp().defaultNow(),
  created_at: timestamp().onUpdateNow(),
});
