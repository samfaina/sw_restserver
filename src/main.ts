import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.SW_REST_NAMESPACE);
  await app.listen(process.env.SW_REST_PORT);
}
bootstrap();
