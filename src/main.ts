import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  
  const configService = app.get(ConfigService)
  

  const port =  configService.get<string>('PORT')
  await app.listen(port, () => console.log(`app listening at port ${port} at ${new Date().toISOString()}`));
  
}
bootstrap().catch(err => console.error(err));

