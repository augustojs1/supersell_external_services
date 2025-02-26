import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { AppExceptionFilter } from './infra/filters/exceptions';

async function bootstrap() {
  const PORT = Number(process.env.PORT);
  const HOST = process.env.SUPERSELL_EXTERNAL_SERVICE_HOST;
  const NODE_ENV = process.env.NODE_ENV;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: PORT,
        host: HOST,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new AppExceptionFilter());

  await app.listen();

  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}! 🚀`);
}

bootstrap();
