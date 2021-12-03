import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import * as cookie from 'cookie-parser';

import AppModule from './app.module';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('key.pem', 'utf-8'),
    cert: fs.readFileSync('ca.pem', 'utf-8'),
    passphrase: process.env.CERT_PASS,
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  });
  app.use(cookie());

  // await app.listen(3333);
  await app.listen(5000);
}

bootstrap();
