import { Controller, Get } from '@nestjs/common';

@Controller('/api/v1/health')
export class HealthCheckController {
  @Get('/')
  public getHealthCheck() {
    return {
      status: 'Ok!',
    };
  }
}
