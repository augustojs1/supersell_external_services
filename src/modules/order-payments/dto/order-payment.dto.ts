import { PaymentMethods } from '../enums';

class CreditCardMethodData {
  card_number: string;
  card_holder: string;
  expiration_date: string;
  cvv: string;
}

export class OrderPaymentDto {
  order: {
    id: string;
    total_price: number;
  };
  method: PaymentMethods;
  paymentDetails: CreditCardMethodData;
}
