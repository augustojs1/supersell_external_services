import { Module } from '@nestjs/common';

import { ITemplateEngineService } from './itemplate-engine-service.interface';
import { EjsTemplateEngineService } from './impl';

@Module({
  providers: [
    {
      provide: ITemplateEngineService,
      useClass: EjsTemplateEngineService,
    },
  ],
  exports: [ITemplateEngineService],
})
export class TemplateEngineModule {}
