import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:'*'
  })
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      let exceptionBody = errors
         .map(el => el.property + ' ' + 'is incorrect!')

     return new BadRequestException(exceptionBody);
    }
  }));
  await app.listen(3000);
}
bootstrap();
