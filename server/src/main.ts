import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Set global prefix (so all routes start with /api)
  app.setGlobalPrefix('api');

  // ✅ Enable CORS for your React frontend
  app.enableCors({
    origin: 'http://localhost:3000', // React dev server
    credentials: true,
  });

  await app.listen(5002);
}
bootstrap();
