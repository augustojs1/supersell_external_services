import {
  EmailOrderConfirmedDto,
  OrderStatusChangeDto,
  PasswordRecoveryEmailDto,
} from '@/infra/events/consumers/emails/dto';

export abstract class IEmailsEventsConsumer {
  abstract handleEmailPasswordReset(
    dto: PasswordRecoveryEmailDto,
  ): Promise<void>;
  abstract handleEmailOrderStatusChange(
    dto: OrderStatusChangeDto,
  ): Promise<void>;
  abstract handleEmailOrderConfirmed(
    dto: EmailOrderConfirmedDto,
  ): Promise<void>;
}
