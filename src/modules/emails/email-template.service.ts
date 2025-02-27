import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';

@Injectable()
export class EmailTemplateService {
  public async getTemplate(data: any): Promise<string> {
    return new Promise((resolve, reject) => {
      ejs.renderFile(
        'src/templates/password_recovery.ejs',
        data,
        async function (error, template) {
          if (!error) {
            resolve(template as string);
          }

          reject(error);
        },
      );
    });
  }
}
