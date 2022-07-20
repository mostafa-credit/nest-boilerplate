import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { createDocument } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, transform: true,
  }))

  SwaggerModule.setup('docs', app, createDocument(app));

  const port = configService.get<string>('PORT')
  await app.listen(port, () => console.log(`app listening at port ${port} at ${new Date().toISOString()}`));

}
bootstrap().catch(err => console.error(err));

