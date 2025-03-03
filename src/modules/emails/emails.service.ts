import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import {
  EmailOrderConfirmedDto,
  OrderStatusChangeDto,
  PasswordRecoveryEmailDto,
} from '@/infra/messaging/consumers/dto';
import { EmailTemplateService } from './email-template.service';
import { EmailStatusTemplateConstant } from '@/infra/messaging/constants';

@Injectable()
export class EmailsService {
  private readonly logger = new Logger(EmailsService.name);
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
        from: this.configService.get<string>('email.admin'),
        to: data.email,
        subject: 'Supersell - Your password reset link.',
        html: template,
      });

      this.logger.log(
        `Password reset link email SUCCESS sent for email ${data.email}.`,
      );
    } catch (error) {
      this.logger.error(
        `Password reset link email FAILED for email ${data.email}.`,
        error,
      );
    }
  }

  public async sendOrderStatusChangeEmail(data: OrderStatusChangeDto) {
    try {
      const statusData = this.orderStatusEmailTemplate[data.status];

      if (!statusData) {
        throw new Error(
          `Order status email template does not exists for status ${data.status}`,
        );
      }

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

      this.logger.log(
        `Order change to status ${data.status} email successfully sent for Order #${data.order_id} to customer ${data.customer_email}.`,
      );
    } catch (error) {
      this.logger.error(
        `Failed sending order change status to ${data.status} email for Order #${data.order_id} to customer ${data.customer_email}::`,
        error,
      );
    }
  }

  public async sendOrderReceiptEmail(dto: EmailOrderConfirmedDto) {
    try {
      const template =
        await this.emailTemplateService.getOrderReceiptTemplate(dto);

      await this.mailerService.sendMail({
        from: this.configService.get<string>('email.admin'),
        to: dto.user.email,
        subject: `Your Order #${dto.order_id} – Receipt & Details`,
        html: template,
      });

      this.logger.log(
        `Order receipt email SUCCESS sent for Order #${dto.order_id} to customer ${dto.user.email}.`,
      );
    } catch (error) {
      this.logger.error(
        `Order receipt email FAILED sent for Order #${dto.order_id} to customer ${dto.user.email}.`,
        error,
      );
    }
  }
}
