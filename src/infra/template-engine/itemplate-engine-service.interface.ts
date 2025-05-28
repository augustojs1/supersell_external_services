export abstract class ITemplateEngineService {
  abstract getTemplate(html: string, data: any): Promise<string>;
  abstract getOrderStausChangeTemplate(data: {
    templatePath: string;
    payload: any;
  }): Promise<string>;
  abstract getOrderReceiptTemplate(data: any): Promise<string>;
}
