import { Injectable } from '@nestjs/common';

import { OrderStatus } from './enums';
import { OrdersRepository } from './orders.repository';
import { PaymentData } from './types/payment-data.type';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async updateOrderStatus(
    orderStatus: OrderStatus,
    paymentData: PaymentData,
  ) {
    await this.ordersRepository.createOrderPaymentAndSetOrderStatusTrx(
      orderStatus,
      paymentData,
    );
  }
}
