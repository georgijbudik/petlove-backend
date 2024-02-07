import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
