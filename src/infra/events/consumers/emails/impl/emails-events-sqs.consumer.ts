import { IEmailsEventsConsumer } from '@/infra/events/consumers/emails/iemails-consumer.interface';
import {
  EmailOrderConfirmedDto,
  OrderStatusChangeDto,
  PasswordRecoveryEmailDto,
} from '@/infra/events/consumers/emails/dto';
import { EmailsService } from '@/modules/emails/emails.service';

export class EmailsEventsSqsConsumer implements IEmailsEventsConsumer {
  constructor(private readonly emailsService: EmailsService) {}

  handleEmailOrderConfirmed(dto: EmailOrderConfirmedDto): Promise<void> {
    return;
  }

  handleEmailOrderStatusChange(dto: OrderStatusChangeDto): Promise<void> {
    return;
  }

  handleEmailPasswordReset(dto: PasswordRecoveryEmailDto): Promise<void> {
    return;
  }
}
