import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';
import { ITemplateEngineService } from '../itemplate-engine-service.interface';

@Injectable()
export class EjsTemplateEngineService implements ITemplateEngineService {
  public async getTemplate(templateString: string, data: any): Promise<string> {
    try {
      const html = ejs.render(templateString, data, {
        async: true,
      });

      return html;
    } catch (error) {
      throw new Error(`Error generating HTML from string:: ${error}`);
    }

    // return new Promise((resolve, reject) => {
    //   ejs.renderFile(
    //     '../../../../src/templates/ejs/password_recovery.ejs',
    //     data,
    //     async function (error, template) {
    //       if (!error) {
    //         resolve(template as string);
    //       }

    //       reject(error);
    //     },
    //   );
    // });
  }

  public async getOrderStausChangeTemplate(data: {
    templatePath: string;
    payload: any;
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      ejs.renderFile(
        data.templatePath,
        data.payload,
        async function (error, template) {
          if (!error) {
            resolve(template as string);
          }

          reject(error);
        },
      );
    });
  }

  public async getOrderReceiptTemplate(data: any): Promise<string> {
    return new Promise((resolve, reject) => {
      ejs.renderFile(
        'src/ejs/templates/order_receipt.ejs',
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
