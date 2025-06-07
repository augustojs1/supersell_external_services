import { OrderEntity } from './order-entity.type';

export class OrderCustomer {
  customer: {
    first_name: string;
    email: string;
  };
  order: OrderEntity;
}
