export abstract class ITemplateEngineService {
  abstract getTemplate(data: any): Promise<string>;
  abstract getOrderStausChangeTemplate(data: {
    templatePath: string;
    payload: any;
  }): Promise<string>;
  abstract getOrderReceiptTemplate(data: any): Promise<string>;
}
