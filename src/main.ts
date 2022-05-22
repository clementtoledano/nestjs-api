import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { runDbMigrations } from './shared/utils';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import morgan from 'morgan';


import * as fs from 'fs';
const logStream = fs.createWriteStream('api.log', {
  flags: 'a', // append
});

const port = +process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  //Middleware set security-related HTTP headers
  app.use(helmet());
  //Middleware provides various options that you can customize based on your requirements
  app.enableCors();
  //Midleware protects your applications from brute-force attacks
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );

  /**
   * Run DB migrations
   */
  await runDbMigrations();

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('1001refs API')
    .setDescription('La description de mon Api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  app.use(morgan('tiny', { stream: logStream }));

  await app.listen(port);
  console.log('Port running on: ', port);
}

bootstrap();
