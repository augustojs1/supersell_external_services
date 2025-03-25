import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { AppExceptionFilter } from './infra/filters/exceptions';

async function bootstrap() {
  const PORT = Number(process.env.PORT);
  const HOST = process.env.SUPERSELL_EXTERNAL_SERVICE_HOST;
  const NODE_ENV = process.env.NODE_ENV;

  const app = await NestFactory.create(AppModule);

  const queues = ['email', 'payment'];

  for (const queue of queues) {
    await app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: queue,
        noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    });
  }

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

  await app.startAllMicroservices();
  await app.listen(PORT);

  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}! 🚀`);
}

bootstrap();
