import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import * as dotenv from 'dotenv';
import { DefaultLogger } from 'logging/defaultLogger.service';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new DefaultLogger(),
  });
  await app.listen(process.env.APP_PORT);
}
bootstrap();
