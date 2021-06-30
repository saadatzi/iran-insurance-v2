import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerService } from '@shared/logger.service';
import { LoggerMiddleware } from './Middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    logger: new LoggerService('Main'),
  });

  // app.use(new LoggerMiddleware());
  // app.useGlobalGuards(RolesGuard);

  const rawBodyBuffer = (req, res, buf, encoding) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  };

  app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
  app.use(bodyParser.json({ verify: rawBodyBuffer }));

  const options = new DocumentBuilder()
    .setTitle('Bimeh Api Docs V3 Nest.js')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('users')
    .addTag('admin')
    .addTag('superAdmin')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}

bootstrap().then((port) =>
  console.log(`App successfully started on http://localhost:3000/api/docs`),
);
