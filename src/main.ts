import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { 
  SwaggerModule, 
  DocumentBuilder 
} from '@nestjs/swagger';

import { AppModule } from './app.module';
import { corsConfig } from './configs/cors.config';
import { ValidationPipe } from './services/pipes/validation.pipe';

async function bootstrap() {
    const PORT = Number(process.env.PORT) || 5500;

    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('Users and Deals')
      .setDescription('Users and Deals API')
      .setVersion('1.0')
      .addTag('sinzem')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, documentFactory);

    app.enableCors(corsConfig());
    // app.enableCors("*");

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`));
}
bootstrap();
