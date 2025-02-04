import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

dotenv.config(); // Завантажує змінні середовища з .env файлу

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000; // Використовуємо PORT з .env або за замовчуванням 3000

  // Налаштування Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS REST API')
    .setDescription('Документація до REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
  console.log('Swagger docs available on http://localhost:3000/api');
}
bootstrap();
