import { PaymentMethods } from '../enums';

class CreditCardMethodData {
  card_number: string;
  card_holder: string;
  expiration_date: string;
  cvv: string;
}

export class OrderPaymentDto {
  method: PaymentMethods;
  paymentDetails: CreditCardMethodData;
}
