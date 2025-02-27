import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { PasswordRecoveryEmailDto } from '@/infra/messaging/consumers/dto';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendPasswordResetLink(data: PasswordRecoveryEmailDto) {
    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Supersell - Your password reset link.',
      from: 'admin.supersell@email.com',
      html: `
        <h3>Hello, ${data.first_name}!</h3>
        <p>Click the following URL to create a new password!</p>
        <br>
        <a href="http://localhost:8000/forgot-password?token=${data.reset_token}"> Redirect </a>
        <br>
        <br>
        <span>Att. Supersell Team inc.</span>
      `,
    });
  }
}
