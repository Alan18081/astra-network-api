import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';
import { PORT } from './config';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());


  app.use(helmet());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }));

  const options = new DocumentBuilder()
    .setTitle('Astra-network')
    .setDescription('Social network')
    .setVersion('0.1.0')
    .addTag('social')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
