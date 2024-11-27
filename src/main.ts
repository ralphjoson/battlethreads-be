import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NgrokService } from './providers/ngrok.service';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
    );
    next();
  });

  const config = new ConfigService();

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Battle Threads API')
    .addServer(`${process.env.SERVER_URL}/api/v1`)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions, {});
  SwaggerModule.setup('api/v1/docs', app, document);
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT || 3000);

  if (config.get('ENVIRONMENT') == 'local') {
    const ngrokService = app.get(NgrokService);
    const publicUrl = ngrokService.getNgrokUrl();
    console.log(`Ngrok URL is: ${publicUrl}`);

    const updatedSwaggerOptions = new DocumentBuilder()
      .setTitle('Battle Threads API')
      .addServer(publicUrl + '/api/v1')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          description: 'Enter JWT',
          in: 'Header',
        },
        'access-token',
      )
      .build();

    const updatedDocument = SwaggerModule.createDocument(
      app,
      updatedSwaggerOptions,
      {},
    );
    SwaggerModule.setup('api/v1/docs', app, updatedDocument);
  }
}
bootstrap();
