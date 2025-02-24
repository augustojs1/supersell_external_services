import { Injectable } from '@nestjs/common';

import { OrderPaymentDto } from './dto/order-payment.dto';
import { MockPaymentGatewayService } from '@/infra/payment-gateway/impl';

@Injectable()
export class PaymentsService {
  constructor(private readonly mockPaymentGateway: MockPaymentGatewayService) {}

  create(data: OrderPaymentDto) {}
}
