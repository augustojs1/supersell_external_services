import { MailingPayloadModel } from './models';

export abstract class IMailingClientService {
  abstract send(data: MailingPayloadModel): Promise<void>;
}
