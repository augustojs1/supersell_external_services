import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { PasswordRecoveryEmailDto } from '@/infra/messaging/consumers/dto';
import { EmailTemplateService } from './email-template.service';

@Injectable()
export class EmailsService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly emailTemplateService: EmailTemplateService,
  ) {}

  public async sendPasswordResetLink(data: PasswordRecoveryEmailDto) {
    try {
      const template = await this.emailTemplateService.getTemplate(data);

      await this.mailerService.sendMail({
        from: 'admin.supersell@email.com',
        to: data.email,
        subject: 'Supersell - Your password reset link.',
        html: template,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
