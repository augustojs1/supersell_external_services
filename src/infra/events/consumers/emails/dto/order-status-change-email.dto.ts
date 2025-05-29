import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { MessagingTopics, OrderStatus } from '@/infra/events/enum';

export class OrderStatusChangeDto {
  topic_name?: MessagingTopics.EMAIL_ORDER_STATUS_CHANGE;

  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @IsNotEmpty()
  @IsString()
  customer_name: string;

  @IsNotEmpty()
  @IsString()
  customer_email: string;

  @IsNotEmpty()
  @IsString()
  seller_id: string;
}
