export abstract class IPaymentEventsConsumer {
  abstract handleOrdersPayment(data: any): Promise<void>;
}
