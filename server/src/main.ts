import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const whitelist = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    // 'http://172.18.0.4:3000',
    'http://3.26.99.48:3000', // live client
  ];

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: (origin, cb) => {
      if (!origin || whitelist.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // ✅ allow preflight
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // ✅ allow headers
    optionsSuccessStatus: 204, // ✅ make OPTIONS return 204 with headers
  });

  // await app.listen(5002, '0.0.0.0');   // EC2 / accessible from other hosts
  await app.listen(5002, '0.0.0.0'); // local dev only
}
bootstrap();
