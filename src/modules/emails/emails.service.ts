import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerFactory, JsonLogger } from 'json-logger-service';

import {
  EmailOrderConfirmedDto,
  OrderStatusChangeDto,
  PasswordRecoveryEmailDto,
} from '@/infra/events/consumers/emails/dto';
import { EmailStatusTemplateConstant } from '@/infra/events/consumers/emails/constants';
import { ITemplateEngineService } from '@/infra/template-engine/itemplate-engine-service.interface';
import { IMailingClientService } from '@/infra/mailing-client/imailing-client-service.interface';
import { EmailTemplatesRepository } from './email-templates.repository';
import { EmailTemplateEntity } from './models';
import { EmailTemplateTypes, OrderStatusToEmailType } from './enums';

@Injectable()
export class EmailsService {
  private readonly logger: JsonLogger = LoggerFactory.createLogger(
    EmailsService.name,
  );

  constructor(
    private readonly configService: ConfigService,
    private readonly mailingClientService: IMailingClientService,
    private readonly templateEngineService: ITemplateEngineService,
    private readonly emailTemplatesRepository: EmailTemplatesRepository,
  ) {}

  private async findEmailTemplateByType(
    type: EmailTemplateTypes,
  ): Promise<EmailTemplateEntity> {
    const emailTemplate = await this.emailTemplatesRepository.findByType(type);

    if (!emailTemplate) {
      throw new Error(`Email template for type ${type} does not exists!`);
    }

    return emailTemplate;
  }

  public async sendPasswordResetLink(data: PasswordRecoveryEmailDto) {
    try {
      const emailTemplate = await this.findEmailTemplateByType(
        EmailTemplateTypes.PASSWORD_RECOVERY,
      );

      this.logger.info(
        {
          html: emailTemplate,
        },
        `Email template found for type ${EmailTemplateTypes.PASSWORD_RECOVERY}`,
      );

      const template = await this.templateEngineService.getTemplate(
        emailTemplate.html,
        data,
      );

      this.logger.info(
        {
          html: template,
        },
        `Email template generated for type ${EmailTemplateTypes.PASSWORD_RECOVERY}`,
      );

      await this.mailingClientService.send({
        from: this.configService.get<string>('email.admin'),
        to: data.email,
        subject: 'Supersell - Your password reset link.',
        html: template,
      });

      this.logger.info(
        {
          body: data,
        },
        `Password reset link email SUCCESS sent for email ${data.email}.`,
      );
    } catch (error) {
      this.logger.error(
        {
          error,
          body: data,
        },
        `Password reset link email FAILED for email ${data.email}.`,
      );
    }
  }

  public async sendOrderStatusChangeEmail(
    data: OrderStatusChangeDto,
  ): Promise<void> {
    const emailTemplateType = OrderStatusToEmailType[data.status];

    console.log('emailTemplateType.:', emailTemplateType);

    try {
      const emailTemplate =
        await this.findEmailTemplateByType(emailTemplateType);

      this.logger.info(
        {
          html: emailTemplate,
        },
        `Email template found for type ${emailTemplateType}`,
      );

      const template = await this.templateEngineService.getTemplate(
        emailTemplate.html,
        data,
      );

      console.log('generated template.:', template);

      const subject = EmailStatusTemplateConstant[data.status].getSubject(
        data.order_id,
      );

      console.log('subject.:', subject);

      await this.mailingClientService.send({
        from: this.configService.get<string>('email.admin'),
        to: data.customer_email,
        subject: subject,
        html: template,
      });

      this.logger.info(
        {
          body: data,
        },
        `Order change to status ${data.status} email successfully sent for Order #${data.order_id} to customer ${data.customer_email}.`,
      );
    } catch (error) {
      this.logger.error(
        {
          error,
          body: data,
        },
        `Failed sending order change status to ${data.status} email for Order #${data.order_id} to customer ${data.customer_email}::`,
      );
    }
  }

  public async sendOrderReceiptEmail(dto: EmailOrderConfirmedDto) {
    try {
      const emailTemplate = await this.findEmailTemplateByType(
        EmailTemplateTypes.ORDER_RECEIPT,
      );

      this.logger.info(
        {
          html: emailTemplate,
        },
        `Email template found for type ${EmailTemplateTypes.ORDER_RECEIPT}`,
      );

      const htmlString = await this.templateEngineService.getTemplate(
        emailTemplate.html,
        dto,
      );

      this.logger.info(
        {
          html: htmlString,
        },
        `Email template generated for type ${EmailTemplateTypes.ORDER_RECEIPT}`,
      );

      await this.mailingClientService.send({
        from: this.configService.get<string>('email.admin'),
        to: dto.user.email,
        subject: `Your Order #${dto.order_id} – Receipt & Details`,
        html: htmlString,
      });

      this.logger.info(
        {
          body: dto,
        },
        `Order receipt email SUCCESS sent for Order #${dto.order_id} to customer ${dto.user.email}.`,
      );
    } catch (error) {
      this.logger.error(
        {
          error: error,
          body: dto,
        },
        `Order receipt email FAILED sent for Order #${dto.order_id} to customer ${dto.user.email}.`,
      );
    }
  }
}
