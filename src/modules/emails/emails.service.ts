import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import {
  OrderStatusChangeDto,
  PasswordRecoveryEmailDto,
} from '@/infra/messaging/consumers/dto';
import { EmailTemplateService } from './email-template.service';
import { EmailStatusTemplateConstant } from '@/infra/messaging/constants';

@Injectable()
export class EmailsService {
  public orderStatusEmailTemplate = EmailStatusTemplateConstant;

  constructor(
    private readonly configService: ConfigService,
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

  public async sendOrderStatusChangeEmail(data: OrderStatusChangeDto) {
    try {
      const statusData = this.orderStatusEmailTemplate[data.status];

      const template =
        await this.emailTemplateService.getOrderStausChangeTemplate({
          payload: data,
          templatePath: statusData.templatePath,
        });

      await this.mailerService.sendMail({
        from: this.configService.get<string>('email.admin'),
        to: data.customer_email,
        subject: statusData.getSubject(data.order_id),
        html: template,
      });

      console.log(
        `Order change status email successfully sent for Order #${data.order_id} to customer ${data.customer_email}.`,
      );
    } catch (error) {
      console.log(
        `Failed sending order change email for Order #${data.order_id} to customer ${data.customer_email}::`,
        error,
      );
    }
  }
}
