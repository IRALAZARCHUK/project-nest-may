import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Налаштування Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS REST API')
    .setDescription('Документація до REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Server is running on http://localhost:3000');
    console.log('Swagger docs available on http://localhost:3000/api');
}
bootstrap();