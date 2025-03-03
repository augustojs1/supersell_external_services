import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

class OrderItem {
  quantity: number;
  product_id: string;
  product_name: string;
  product_price: number;
  subtotal_price: number;
  product_quantity: number;
  product_seller_id: string;
  product_description: string;
  product_seller_username: string;
  product_thumbnail_image_url: string;
}

export class CustomerUser {
  first_name: string;
  email: string;
}

export class DeliveryAddress {
  id: string;
  user_id: string;
  country_code: string;
  type: string;
  alias: string;
  complement: string;
  number: string;
  street: string;
  neighborhood: string;
  district: string;
  postalcode: string;
  city: string;
  updated_at: Date;
  created_at: Date;
}

export class EmailOrderConfirmedDto {
  @IsNotEmpty()
  @Type(() => CustomerUser)
  user: CustomerUser;

  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsNotEmpty()
  order_total_price: number;

  @IsNotEmpty()
  @IsArray()
  order_items: OrderItem[];

  @IsNotEmpty()
  order_created_at: Date;

  @IsNotEmpty()
  @Type(() => DeliveryAddress)
  delivery_address: DeliveryAddress;
}
