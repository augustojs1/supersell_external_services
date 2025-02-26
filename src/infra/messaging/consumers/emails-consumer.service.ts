import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { MessagingTopics } from '../enum';

@Controller()
export class EmailsMessageConsumer {
  constructor() {}

  @EventPattern(MessagingTopics.EMAIL_PASSWORD_RESET)
  public async handleEmailPasswordReset(data) {
    console.log('EMAIL MESSAGE::', data);
  }
}
