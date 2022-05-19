import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

import { runDbMigrations } from './shared/utils';
import 'dotenv/config';

const port = process.env.APP_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = +process.env.APP_PORT || 3000;
  app.setGlobalPrefix('api');
  console.log('Port running on: ', port);

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('1001refs API')
    .setDescription('La description de mon Api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /**
   * Run DB migrations
   */
  await runDbMigrations();

  await app.listen(port);
  await Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
