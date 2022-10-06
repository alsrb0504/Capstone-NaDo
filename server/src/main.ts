import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3002',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true
  })
  await app.listen(3000);
}
bootstrap();
