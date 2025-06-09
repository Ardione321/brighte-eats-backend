import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GraphqlExceptionFilter } from 'src/utils/exception-filters/graphql-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips unknown properties on request
      forbidNonWhitelisted: true, // Throws error on unknown properties
      transform: true, // Transform payload to DTO instances
    }),
  );
  app.useGlobalFilters(new GraphqlExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
